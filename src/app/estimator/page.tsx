"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function ConfiguratorPage() {
  const [configuration, setConfiguration] = useState({
    panelType: "",
    systemSize: [5],
    inverterType: "",
    batteryStorage: false,
    roofType: "",
    installationAngle: [30],
    estimatedCost: 0,
  });

  const calculateCost = () => {
    const baseCost = configuration.systemSize[0] * 3000;
    const batteryAddon = configuration.batteryStorage ? 5000 : 0;
    const angleMultiplier = configuration.installationAngle[0] / 30;

    return Math.round(baseCost * angleMultiplier + batteryAddon);
  };

  const handleConfigChange = (key: string, value: string | number[] | boolean) => {
    setConfiguration(prev => ({
      ...prev,
      [key]: value,
      estimatedCost: key === "estimatedCost" ? (typeof value === 'number' ? value : 0) : calculateCost(),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Solar Wire Map Configurator
          </h1>
          <p className="text-lg text-gray-600">
            Design and configure your solar installation system
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Panel */}
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Panel Type */}
              <div className="space-y-2">
                <Label htmlFor="panelType">Panel Type</Label>
                <Select onValueChange={(value) => handleConfigChange("panelType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select panel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monocrystalline">Monocrystalline</SelectItem>
                    <SelectItem value="polycrystalline">Polycrystalline</SelectItem>
                    <SelectItem value="thin-film">Thin Film</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* System Size */}
              <div className="space-y-2">
                <Label htmlFor="systemSize">System Size (kW): {configuration.systemSize[0]}</Label>
                <Slider
                  value={configuration.systemSize}
                  onValueChange={(value) => handleConfigChange("systemSize", value)}
                  max={20}
                  min={1}
                  step={0.5}
                  className="w-full"
                />
              </div>

              {/* Inverter Type */}
              <div className="space-y-2">
                <Label htmlFor="inverterType">Inverter Type</Label>
                <Select onValueChange={(value) => handleConfigChange("inverterType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inverter type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="string">String Inverter</SelectItem>
                    <SelectItem value="microinverter">Microinverter</SelectItem>
                    <SelectItem value="optimizer">Power Optimizer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Battery Storage */}
              <div className="flex items-center justify-between">
                <Label htmlFor="batteryStorage">Battery Storage</Label>
                <Switch
                  id="batteryStorage"
                  checked={configuration.batteryStorage}
                  onCheckedChange={(checked) => handleConfigChange("batteryStorage", checked)}
                />
              </div>

              {/* Roof Type */}
              <div className="space-y-2">
                <Label htmlFor="roofType">Roof Type</Label>
                <Select onValueChange={(value) => handleConfigChange("roofType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select roof type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asphalt">Asphalt Shingle</SelectItem>
                    <SelectItem value="tile">Tile</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="flat">Flat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Installation Angle */}
              <div className="space-y-2">
                <Label htmlFor="installationAngle">Installation Angle (°): {configuration.installationAngle[0]}</Label>
                <Slider
                  value={configuration.installationAngle}
                  onValueChange={(value) => handleConfigChange("installationAngle", value)}
                  max={60}
                  min={0}
                  step={5}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Summary Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Configuration Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Panel Type:</span>
                  <span className="capitalize">{configuration.panelType || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">System Size:</span>
                  <span>{configuration.systemSize[0]} kW</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Inverter Type:</span>
                  <span className="capitalize">{configuration.inverterType || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Battery Storage:</span>
                  <span>{configuration.batteryStorage ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Roof Type:</span>
                  <span className="capitalize">{configuration.roofType || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Installation Angle:</span>
                  <span>{configuration.installationAngle[0]}°</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Estimated Cost:</span>
                  <span>${calculateCost().toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Button className="w-full" size="lg">
                  Generate Wire Map
                </Button>
                <Button variant="outline" className="w-full">
                  Export Configuration
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wire Map Visualization Placeholder */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Wire Map Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">⚡</div>
                <p className="text-lg font-medium">Wire Map Preview</p>
                <p className="text-sm">Configure your system above to generate the wire map</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}