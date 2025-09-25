"use client";

import React, { useState, useMemo } from "react";
import { Calculator, Search, ChevronDown, Target } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

interface NumberSelectorProps {
  numbers: number[];
  setNumber?: (num: number | null) => void;
  activeNumber: number | null;
  setActiveNumber: (num: number | null) => void;
}

function NumberSelector({
  numbers,
  setNumber,
  activeNumber,
  setActiveNumber,
}: NumberSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const handleNumberSelect = (num: number) => {
    const newValue = activeNumber === num ? null : num;
    setActiveNumber(newValue);
    if (setNumber) setNumber(newValue);
    setShowDropdown(false);
  };

  // Filter numbers based on search term
  const filteredNumbers = useMemo(() => {
    const sortedNumbers = [...numbers].sort((a, b) => a - b);

    if (!searchTerm) {
      return sortedNumbers;
    }

    return sortedNumbers.filter(num =>
      num.toString().includes(searchTerm)
    );
  }, [numbers, searchTerm]);

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Calculator className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Seleção de Quantidade</h3>
        <span className="text-sm text-gray-500">({numbers.length} opções)</span>
      </div>

      {/* Seleção Direta */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-green-600" />
            <h4 className="font-semibold text-gray-900">Seleção de Número</h4>
          </div>

          {/* Dropdown Selector */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <span className={activeNumber ? "text-gray-900" : "text-gray-500"}>
                {activeNumber ? `${activeNumber} módulos` : "Clique para selecionar um número..."}
              </span>
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-hidden">
                {/* Search within dropdown */}
                <div className="p-3 border-b bg-gray-50">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar número..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {searchTerm && (
                    <div className="mt-2 text-xs text-gray-600">
                      {filteredNumbers.length} resultado(s) encontrado(s)
                    </div>
                  )}
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredNumbers.length === 0 ? (
                    <div className="px-3 py-4 text-center text-gray-500">
                      <div className="text-sm">Nenhum número encontrado</div>
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                      >
                        Limpar busca
                      </button>
                    </div>
                  ) : (
                    filteredNumbers.slice(0, 200).map((num) => (
                      <button
                        key={num}
                        onClick={() => handleNumberSelect(num)}
                        className={`w-full px-3 py-2 text-left hover:bg-blue-50 flex items-center justify-between transition-colors ${
                          activeNumber === num ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-700"
                        }`}
                      >
                        <span>{num} módulos</span>
                        {activeNumber === num && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))
                  )}

                  {filteredNumbers.length > 200 && (
                    <div className="px-3 py-2 text-xs text-gray-500 text-center border-t bg-gray-50">
                      Mostrando primeiros 200 resultados. Continue digitando para refinar a busca.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>


          {/* Clear Selection */}
          {activeNumber && (
            <div className="pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNumberSelect(activeNumber)}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                Limpar Seleção
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Selection Summary */}
      {activeNumber && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-green-900">
              Quantidade Selecionada: {activeNumber} módulos
            </span>
          </div>
        </Card>
      )}
    </div>
  );
}

export default NumberSelector;