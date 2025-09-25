import { ResponsiveModal } from "@/components/ui/responsive-modal";

import { Card } from "@/components/ui/card";
import {
  Zap,
  Grid3X3,
  Activity,
  Thermometer,
  Calculator,
  Info
} from "lucide-react";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";

interface DialogWiringProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  wiring: any;
  module: any;
}

export default function DialogWiring({
  open,
  setOpen,
  wiring,
  module,
}: DialogWiringProps) {

  // Helper functions with better formatting
  const calculations = {
    imp: () => {
      if (!wiring?.s || !module?.imp) return 0;
      return Math.round(wiring.s * module.imp * 100) / 100;
    },
    vocTMin: () => {
      if (!wiring?.m || !module?.vocTMin) return 0;
      return Math.round(wiring.m * module.vocTMin * 100) / 100;
    },
    vmpTMax: () => {
      if (!wiring?.m || !module?.vmpTMax) return 0;
      return Math.round(wiring.m * module.vmpTMax * 100) / 100;
    },
    dcPower: () => {
      if (!wiring?.s || !wiring?.m || !module?.dcPower) return 0;
      return Math.round(wiring.s * wiring.m * module.dcPower * 100) / 100;
    },
    totalModules: () => {
      if (!wiring?.s || !wiring?.m) return 0;
      return wiring.s * wiring.m;
    }
  };

  const formatWiring = () => {
    if (!wiring) return "Configuração não disponível";
    return `${wiring.s} string${wiring.s > 1 ? 's' : ''} × ${wiring.m} módulo${wiring.m > 1 ? 's' : ''} cada`;
  };

  if (!wiring || !module) {
    return (
      <ResponsiveModal
        open={open}
        onOpenChange={setOpen}
        title="Detalhes da Configuração"
        className="p-4 sm:p-6"
      >
        <div className="text-center py-6 sm:py-8 text-gray-500">
          <Zap className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-300" />
          <p className="text-sm sm:text-base">Nenhuma configuração selecionada</p>
        </div>
      </ResponsiveModal>
    );
  }

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={setOpen}
      title="Detalhes da Configuração"
      className="p-4 sm:p-6"
    >

        <div className="space-y-4 sm:space-y-6">
          {/* Configuration Overview */}
          <Card className="p-4 sm:p-6 border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4 sm:h-5 sm:w-5" />
                <h3 className="text-base sm:text-lg font-semibold">Configuração</h3>
              </div>
              <span className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium self-start sm:self-auto">
                {calculations.totalModules()} módulos
              </span>
            </div>

            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold mb-2">
                {formatWiring()}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm">
                {wiring.s} string{wiring.s > 1 ? 's' : ''} com {wiring.m} módulo{wiring.m > 1 ? 's' : ''} cada
              </div>
            </div>
          </Card>

          {/* Key Specifications */}
          <Card className="p-4 sm:p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-base sm:text-lg font-semibold">Especificações</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Power */}
              <div className="space-y-2">
                <div className="text-xs sm:text-sm text-gray-600">Potência Total</div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {formatDecimalBr(calculations.dcPower())} kWp
                </div>
                <div className="text-xs text-gray-500">
                  {wiring.s} × {wiring.m} × {formatDecimalBr(module.dcPower)}W
                </div>
              </div>

              {/* Current */}
              <div className="space-y-2">
                <div className="text-xs sm:text-sm text-gray-600">Corrente Total (25°C)</div>
                <div className="text-2xl sm:text-3xl font-bold">
                  {formatDecimalBr(calculations.imp())} A
                </div>
                <div className="text-xs text-gray-500">
                  {wiring.s} strings × {formatDecimalBr(module.imp)}A
                </div>
              </div>
            </div>
          </Card>

          {/* Temperature Variations */}
          <Card className="p-4 sm:p-6 border">
            <div className="flex items-center gap-2 mb-4">
              <Thermometer className="h-4 w-4 sm:h-5 sm:w-5" />
              <h3 className="text-base sm:text-lg font-semibold">Variações de Temperatura</h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Cold Temperature */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm sm:text-base">Tensão em Circuito Aberto (0°C)</div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {formatDecimalBr(calculations.vocTMin())} V
                  </div>
                </div>
                <div className="text-left sm:text-right text-xs text-gray-500">
                  <div>{wiring.m} módulos em série</div>
                  <div>{formatDecimalBr(module.vocTMin)}V por módulo</div>
                </div>
              </div>

              {/* Hot Temperature */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium text-sm sm:text-base">Tensão de Máxima Potência (70°C)</div>
                  <div className="text-xl sm:text-2xl font-bold">
                    {formatDecimalBr(calculations.vmpTMax())} V
                  </div>
                </div>
                <div className="text-left sm:text-right text-xs text-gray-500">
                  <div>{wiring.m} módulos em série</div>
                  <div>{formatDecimalBr(module.vmpTMax)}V por módulo</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Module Information */}
          <Card className="p-6 border bg-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Calculator className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Informações do Módulo</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold">{formatDecimalBr(module.dcPower)}W</div>
                <div className="text-sm text-gray-600">Potência</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatDecimalBr(module.imp)}A</div>
                <div className="text-sm text-gray-600">Imp (25°C)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatDecimalBr(module.voc)}V</div>
                <div className="text-sm text-gray-600">Voc (25°C)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold">{formatDecimalBr(module.vmp)}V</div>
                <div className="text-sm text-gray-600">Vmp (25°C)</div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <div className="border rounded-lg p-6 bg-gray-50">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-2">Resumo</div>
              <div className="text-xl font-bold mb-1">
                {calculations.totalModules()} módulos • {formatDecimalBr(calculations.dcPower())} kWp
              </div>
              <div className="text-sm text-gray-600">
                {formatDecimalBr(calculations.imp())}A total • {formatDecimalBr(calculations.vmpTMax())}V por string
              </div>
            </div>
          </div>
        </div>
    </ResponsiveModal>
  );
}