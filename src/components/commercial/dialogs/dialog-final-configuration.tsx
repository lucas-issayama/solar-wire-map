import { ResponsiveModal } from "@/components/ui/responsive-modal";

import { Card } from "@/components/ui/card";
import {
  Zap,
  Grid3X3,
  Activity,
  Thermometer,
  Calculator,
  Settings
} from "lucide-react";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";

interface DialogFinalConfigurationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedInverter: unknown;
  selectedModule: unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFinalConfig?: (...args: any[]) => any;
}

export default function DialogFinalConfiguration({
  open,
  setOpen,
  selectedInverter,
  selectedModule,
}: DialogFinalConfigurationProps) {
  if (!selectedInverter || !selectedModule) {
    return (
      <ResponsiveModal
        open={open}
        onOpenChange={setOpen}
        title="Detalhes da Configuração Final"
        className="p-4 sm:p-6"
      >
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <Settings className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
          <p className="text-sm sm:text-base">Configuração não disponível</p>
        </div>
      </ResponsiveModal>
    );
  }

  // Type assertions with type guards
  const inverterTyped = selectedInverter as {
    id: number;
    name: string;
    manufacturerName: string;
    acPower: number;
    dcMaxPower: number;
    dcMinPower: number;
    acVoltage: number;
    acPhases: number;
    mppts: Array<{
      dcVoltageMax: number;
      dcVoltageMin: number;
      dcCurrentMax: number;
      mMin: number;
      mMax: number;
      options: Record<number, { wirings: Array<{ s: number; m: number; n: number }> }>;
      selection?: {
        number: number;
        subSelection: number;
      };
    }>;
  };

  const moduleTyped = selectedModule as {
    id: number;
    name: string;
    manufacturerName: string;
    imp: number;
    isc: number;
    voc: number;
    vmp: number;
    vocTMin: number;
    vocTMax: number;
    vmpTMax: number;
    dcPower: number;
  };

  // Helper functions for calculations
  const calculateMpptDetails = (
    mppt: typeof inverterTyped.mppts[0],
    module: typeof moduleTyped
  ) => {
    if (!mppt?.selection?.number || !module) return null;

    const wiring = mppt.options?.[mppt.selection.number]?.wirings?.[mppt.selection.subSelection];
    if (!wiring) return null;

    return {
      strings: wiring.s,
      modulesPerString: wiring.m,
      totalModules: wiring.s * wiring.m,
      imp: Math.round(wiring.s * module.imp * 100) / 100,
      vocTMin: Math.round(wiring.m * module.vocTMin * 100) / 100,
      vmpTMax: Math.round(wiring.m * module.vmpTMax * 100) / 100,
      dcPower: Math.round(wiring.s * wiring.m * module.dcPower * 100) / 100,
      wiring: wiring
    };
  };

  const getTotalSystemStats = () => {
    if (!inverterTyped?.mppts || !moduleTyped) return null;

    let totalModules = 0;
    let totalPower = 0;
    let totalCurrent = 0;

    inverterTyped.mppts.forEach((mppt) => {
      const details = calculateMpptDetails(mppt, moduleTyped);
      if (details) {
        totalModules += details.totalModules;
        totalPower += details.dcPower;
        totalCurrent += details.imp;
      }
    });

    return {
      totalModules,
      totalPower: Math.round(totalPower * 100) / 100,
      totalCurrent: Math.round(totalCurrent * 100) / 100,
    };
  };


  const systemStats = getTotalSystemStats();
  const configuredMppts = inverterTyped.mppts.filter((mppt) =>
    mppt.selection?.number && calculateMpptDetails(mppt, moduleTyped)
  );

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title="Configuração Final Completa"
      className="p-4 sm:p-6"
    >

        <div className="space-y-4 sm:space-y-6">
          {/* System Overview */}
          <Card className="p-4 sm:p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-base sm:text-lg font-semibold">Resumo do Sistema</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 border rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold">{systemStats?.totalPower || 0} kWp</div>
                <div className="text-xs sm:text-sm text-gray-600">Potência Total</div>
              </div>
              <div className="text-center p-3 sm:p-4 border rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold">{systemStats?.totalModules || 0}</div>
                <div className="text-xs sm:text-sm text-gray-600">Total de Módulos</div>
              </div>
              <div className="text-center p-3 sm:p-4 border rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold">{systemStats?.totalCurrent || 0} A</div>
                <div className="text-xs sm:text-sm text-gray-600">Corrente Total</div>
              </div>
            </div>
          </Card>

          {/* Equipment Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Module Info */}
            <Card className="p-4 sm:p-6 border bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                <h3 className="text-base sm:text-lg font-semibold">Módulo Selecionado</h3>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm sm:text-base">{moduleTyped.name}</div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">Potência:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(moduleTyped.dcPower)}W</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Imp:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(moduleTyped.imp)}A</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Voc:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(moduleTyped.voc)}V</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Vmp:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(moduleTyped.vmp)}V</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Inverter Info */}
            <Card className="p-4 sm:p-6 border bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                <h3 className="text-base sm:text-lg font-semibold">Inversor Selecionado</h3>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-sm sm:text-base">{inverterTyped.name}</div>
                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">Potência AC:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(inverterTyped.acPower)} kW</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Tensão AC:</span>
                    <span className="ml-1 font-medium">{formatDecimalBr(inverterTyped.acVoltage)} V</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Fases:</span>
                    <span className="ml-1 font-medium">{inverterTyped.acPhases}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">MPPTs:</span>
                    <span className="ml-1 font-medium">{inverterTyped.mppts.length}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* MPPT Configurations */}
          <Card className="p-4 sm:p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-base sm:text-lg font-semibold">Configuração dos MPPTs</h3>
            </div>

            <div className="space-y-4">
              {configuredMppts.length === 0 ? (
                <div className="text-center py-6 sm:py-8 text-gray-500">
                  <div className="text-xs sm:text-sm">Nenhum MPPT configurado</div>
                </div>
              ) : (
                configuredMppts.map((mppt, index: number) => {
                  const details = calculateMpptDetails(mppt, moduleTyped);
                  if (!details) return null;

                  return (
                    <Card key={index} className="p-3 sm:p-4 border">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3">
                        <h4 className="font-semibold text-sm sm:text-base">MPPT {inverterTyped.mppts.indexOf(mppt) + 1}</h4>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium self-start sm:self-auto">
                          {details.totalModules} módulos
                        </span>
                      </div>

                      {/* Configuration */}
                      <div className="mb-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="font-bold text-base sm:text-lg">
                            {details.strings} string{details.strings > 1 ? 's' : ''} × {details.modulesPerString} módulo{details.modulesPerString > 1 ? 's' : ''} cada
                          </div>
                          <div className="text-xs sm:text-sm text-gray-600">
                            {details.strings} strings com {details.modulesPerString} módulos cada
                          </div>
                        </div>
                      </div>

                      {/* Electrical Specs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="text-xs sm:text-sm text-gray-600">Potência</div>
                          <div className="text-xl sm:text-2xl font-bold">
                            {formatDecimalBr(details.dcPower)} kWp
                          </div>
                          <div className="text-xs text-gray-500">
                            {details.strings} × {details.modulesPerString} × {formatDecimalBr(moduleTyped.dcPower)}W
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="text-xs sm:text-sm text-gray-600">Corrente (25°C)</div>
                          <div className="text-xl sm:text-2xl font-bold">
                            {formatDecimalBr(details.imp)} A
                          </div>
                          <div className="text-xs text-gray-500">
                            {details.strings} strings × {formatDecimalBr(moduleTyped.imp)}A
                          </div>
                        </div>
                      </div>

                      {/* Temperature Variations */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 mb-3">
                          <Thermometer className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm font-medium">Variações de Temperatura</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-2 sm:p-3 border rounded">
                            <div className="text-xs text-gray-600">VoC (0°C)</div>
                            <div className="font-bold text-sm">{formatDecimalBr(details.vocTMin)} V</div>
                            <div className="text-xs text-gray-500">{details.modulesPerString} módulos em série</div>
                          </div>
                          <div className="p-2 sm:p-3 border rounded">
                            <div className="text-xs text-gray-600">Vmp (70°C)</div>
                            <div className="font-bold text-sm">{formatDecimalBr(details.vmpTMax)} V</div>
                            <div className="text-xs text-gray-500">{details.modulesPerString} módulos em série</div>
                          </div>
                        </div>
                      </div>

                      {/* MPPT Limits */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="text-xs text-gray-600 mb-2">Limites do MPPT</div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          <div>
                            <span className="text-gray-500">Tensão máx:</span>
                            <span className="ml-1">{formatDecimalBr(mppt.dcVoltageMax)}V</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Tensão mín:</span>
                            <span className="ml-1">{formatDecimalBr(mppt.dcVoltageMin)}V</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Corrente máx:</span>
                            <span className="ml-1">{formatDecimalBr(mppt.dcCurrentMax)}A</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Módulos:</span>
                            <span className="ml-1">{mppt.mMin}-{mppt.mMax}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </Card>

          {/* Final Summary */}
          <div className="border rounded-lg p-4 sm:p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-xs sm:text-sm text-gray-600 mb-2">Configuração Final Validada</div>
              <div className="text-lg sm:text-xl font-bold mb-1">
                Sistema de {systemStats?.totalModules || 0} módulos gerando {systemStats?.totalPower || 0} kWp
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {configuredMppts.length} MPPT{configuredMppts.length !== 1 ? 's' : ''} configurado{configuredMppts.length !== 1 ? 's' : ''} •
                Corrente total: {systemStats?.totalCurrent || 0}A
              </div>
            </div>
          </div>
        </div>
    </ResponsiveModal>
  );
}