"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Info, Zap, Grid } from "lucide-react";
import DialogWiring from "../commercial/dialogs/dialog-wiring";
import { Card } from "./card";
import { Button } from "./button";

interface Selection {
  number: number;
  subSelection: number;
}

interface MpptsSelectorProps {
  numbers: number[];
  activeSelection: Selection | null;
  setActiveSelection: (selection: Selection | null) => void;
  options?: Record<number, { wirings: { s: number; m: number }[] }>;
  module: {
    dcPower: number;
    imp: number;
    voc: number;
    vmp: number;
    vocTMin: number;
    vmpTMax: number;
  };
  mppt: unknown;
}

function MpptsSelector({
  numbers,
  activeSelection,
  setActiveSelection,
  options,
  module,
}: MpptsSelectorProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedOptions, setExpandedOptions] = useState<Set<number>>(new Set());
  const [selectedModuleCount, setSelectedModuleCount] = useState<number | null>(null);

  const handleModuleCountSelect = (count: number) => {
    setSelectedModuleCount(count);
    // Auto-expand options for the selected count
    const newExpanded = new Set(expandedOptions);
    newExpanded.add(count);
    setExpandedOptions(newExpanded);

    // If there's only one wiring option, auto-select it
    const wirings = options?.[count]?.wirings;
    if (wirings && wirings.length === 1) {
      setActiveSelection({ number: count, subSelection: 0 });
    }
  };

  const handleWiringSelect = (moduleCount: number, wiringIndex: number) => {
    setActiveSelection({ number: moduleCount, subSelection: wiringIndex });
  };

  const toggleExpanded = (count: number) => {
    const newExpanded = new Set(expandedOptions);
    if (newExpanded.has(count)) {
      newExpanded.delete(count);
    } else {
      newExpanded.add(count);
    }
    setExpandedOptions(newExpanded);
  };

  useEffect(() => {
    if (activeSelection && !isNaN(activeSelection.number)) {
      setSelectedModuleCount(activeSelection.number);
      setExpandedOptions(prev => {
        const newExpanded = new Set(prev);
        newExpanded.add(activeSelection.number);
        return newExpanded;
      });
    }
  }, [activeSelection]);

  const getWiringDescription = (wiring: { s: number; m: number }) => {
    if (!wiring) return "";
    return `${wiring.s} string${wiring.s > 1 ? 's' : ''} × ${wiring.m} módulo${wiring.m > 1 ? 's' : ''} cada`;
  };

  const getVoltageInfo = (wiring: { s: number; m: number }) => {
    if (!wiring || !module) return "";
    const voltage = wiring.m * module.vmp;
    return `${voltage.toFixed(1)}V por string`;
  };

  const getAvailableModuleCounts = () => {
    return numbers.filter(num => options?.[num]?.wirings && options[num].wirings.length > 0);
  };

  const formatWiring = (option: { s: number; m: number } | undefined) => {
    if (!option) return "";
    return `${option.s} string${option.s > 1 ? 's' : ''} × ${option.m} módulo${option.m > 1 ? 's' : ''}`;
  };

  const availableModuleCounts = getAvailableModuleCounts();

  return (
    <div className="w-full space-y-4">
      <DialogWiring
        open={openDialog}
        setOpen={setOpenDialog}
        wiring={
          activeSelection && !isNaN(activeSelection.number) ? options?.[activeSelection.number]?.wirings[activeSelection.subSelection] || null : null
        }
        module={module}
      />

      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Grid className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Configuração de Módulos</h3>
      </div>

      {/* Module Count Selection */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Escolha a quantidade de módulos:</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {availableModuleCounts.map((count) => {
            const isSelected = selectedModuleCount === count;
            const hasWirings = (options?.[count]?.wirings?.length || 0) > 0;

            return (
              <button
                key={count}
                onClick={() => handleModuleCountSelect(count)}
                disabled={!hasWirings}
                className={`
                  relative p-3 rounded-lg border-2 transition-all duration-200 text-center
                  ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700 shadow-md"
                      : hasWirings
                        ? "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700"
                        : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                  }
                `}
              >
                <div className="font-semibold text-lg">{count}</div>
                <div className="text-xs text-gray-500">módulos</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Wiring Options */}
      {selectedModuleCount && options?.[selectedModuleCount]?.wirings && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-md font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Opções de Cabeamento ({selectedModuleCount} módulos)
            </h4>
            <button
              onClick={() => toggleExpanded(selectedModuleCount)}
              className="text-gray-500 hover:text-gray-700"
            >
              {expandedOptions.has(selectedModuleCount) ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>

          {expandedOptions.has(selectedModuleCount) && (
            <div className="space-y-2">
              {options[selectedModuleCount].wirings.map((wiring: { s: number; m: number }, index: number) => {
                const isSelected = activeSelection?.number === selectedModuleCount &&
                                activeSelection?.subSelection === index;

                return (
                  <button
                    key={index}
                    onClick={() => handleWiringSelect(selectedModuleCount, index)}
                    className={`
                      w-full p-4 rounded-lg border-2 text-left transition-all duration-200
                      ${
                        isSelected
                          ? "border-green-500 bg-green-50 shadow-md"
                          : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">
                          {getWiringDescription(wiring)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {getVoltageInfo(wiring)}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium text-green-700">Selecionado</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* Selection Summary */}
      {activeSelection && !isNaN(activeSelection.number) && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-blue-900">
                Configuração Selecionada: {activeSelection.number} módulos
              </div>
              <div className="text-sm text-blue-700">
                {formatWiring(options?.[activeSelection.number]?.wirings[activeSelection.subSelection])}
              </div>
            </div>
            {activeSelection && options?.[activeSelection.number]?.wirings[activeSelection.subSelection] && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-2"
              >
                <Info className="h-4 w-4" />
                Ver Detalhes
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

export default MpptsSelector;