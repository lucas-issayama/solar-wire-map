"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import SelectObject from "@/components/ui/select-object";
import { LoadingIcon } from "@/components/icons/loading";
import MpptsSelector from "@/components/ui/mppts-selector";
import { Card } from "@/components/ui/card";
import NumberSelector from "@/components/ui/number-selector";
import { Info } from "lucide-react";
import { formatModule } from "@/utils/solar/format-module";
import { recalcInverterFromModule } from "@/utils/solar/recalcInverterFromModule";
import { generateCombinations } from "@/utils/solar/generateCombinations";
import { formatDecimalBr } from "@/utils/format/format-decimal-br";
import { convertToCamelCase } from "@/utils/convertToCamelCase";

import DialogFinalConfiguration from "@/components/commercial/dialogs/dialog-final-configuration";

export default function Configurator() {

  const [loading, setLoading] = useState(false);
  const [loadingConfigs, setLoadingConfigs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFinalDialog, setShowFinalDialog] = useState(false);

  const [inverters, setInverters] = useState<any>([]);
  const [pvModules, setPvModules] = useState<any>([]);
  const [inverterManufacturers, setInverterManufacturers] = useState<any>([]);
  const [moduleManufacturers, setModuleManufacturers] = useState<any>([]);

  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [selectedInverter, setSelectedInverter] = useState<any>(null);

  const [config, setConfig] = useState<any>({});
  const [activeNumber, setActiveNumber] = useState<number | null>(null);

  const [filter, setFilter] = useState({
    inverterManufacturer: null,
    inverterId: null,
    moduleId: null,
    moduleManufacturer: null,
  });

  async function loadInverterManufacturers() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeXNwaGVwdndwdGJ6bHBlYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjEzNDAsImV4cCI6MjA3NDAzNzM0MH0.0yWdqdsShjUzlK8de_jCgT80AoxljmX1JG9OlDWR9Fo");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      // Use the custom RPC function to get distinct manufacturer names
      const response = await fetch("https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/rpc/get_distinct_manufacturers", requestOptions);
      const result = await response.json();

      if (response.ok) {
        // The RPC function returns an array of objects with manufacturer_name property
        // Extract the manufacturer names from the response
        const manufacturers = result.map((item: any) => {
          // Handle both possible response formats
          return item.manufacturer_name || item;
        }).filter((name: string) => name); // Remove any falsy values

        setInverterManufacturers(manufacturers);
      } else {
        console.error('Error loading manufacturers:', result);
        setInverterManufacturers([]);
      }
    } catch {
      setInverterManufacturers([]);
    }
  }

  async function loadModuleManufacturers() {
    try {
      const myHeaders = new Headers();
      myHeaders.append("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeXNwaGVwdndwdGJ6bHBlYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjEzNDAsImV4cCI6MjA3NDAzNzM0MH0.0yWdqdsShjUzlK8de_jCgT80AoxljmX1JG9OlDWR9Fo");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      // Get distinct module manufacturers
      const response = await fetch("https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/pv_modules?select=manufacturer_name", requestOptions);
      const result = await response.json();

      if (response.ok) {
        // Extract unique manufacturer names and filter out nulls
        const manufacturers = [...new Set(result.map((item: any) => item.manufacturer_name))]
          .filter((name: any) => name && typeof name === 'string' && name.trim()) // Remove null/empty values
          .sort(); // Sort alphabetically

        setModuleManufacturers(manufacturers);
      } else {
        console.error('Error loading module manufacturers:', result);
        setModuleManufacturers([]);
      }
    } catch {
      setModuleManufacturers([]);
    }
  }

  async function loadPvModules(manufacturerName?: string) {
    setLoading(true);
    setError(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeXNwaGVwdndwdGJ6bHBlYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjEzNDAsImV4cCI6MjA3NDAzNzM0MH0.0yWdqdsShjUzlK8de_jCgT80AoxljmX1JG9OlDWR9Fo");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      // Build URL with manufacturer filter if provided
      const url = manufacturerName && manufacturerName !== "none"
        ? `https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/pv_modules?manufacturer_name=eq.${manufacturerName}&order=name.asc`
        : `https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/pv_modules?order=name.asc`;

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      if (response.ok) {
        const camelCaseModules = convertToCamelCase(result);
        setPvModules(camelCaseModules);
      } else {
        setPvModules([]);
        setError("Erro ao carregar módulos. Tente novamente.");
      }
    } catch {
      setError("Erro ao carregar módulos. Tente novamente.");
      setPvModules([]);
    } finally {
      setLoading(false);
    }
  }

  async function loadInverters(manufacturerName: string) {
    setLoading(true);
    setError(null);
    try {
      const myHeaders = new Headers();
      myHeaders.append("apiKey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeXNwaGVwdndwdGJ6bHBlYXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NjEzNDAsImV4cCI6MjA3NDAzNzM0MH0.0yWdqdsShjUzlK8de_jCgT80AoxljmX1JG9OlDWR9Fo");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect
      };

      const url = manufacturerName && manufacturerName !== "none"
        ? `https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/inverters?manufacturer_name=eq.${manufacturerName}&order=ac_power.asc`
        : `https://eiysphepvwptbzlpeawq.supabase.co/rest/v1/inverters?order=ac_power.asc`;

      const response = await fetch(url, requestOptions);
      const result = await response.json();

      if (response.ok) {
        const camelCaseInverters = convertToCamelCase(result);
        setInverters(camelCaseInverters);
      } else {
        setInverters([]);
        setError("Erro ao carregar inversores. Tente novamente.");
      }
    } catch {
      setError("Erro ao carregar inversores. Tente novamente.");
      setInverters([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadModuleManufacturers();
    loadInverterManufacturers();
  }, []);


  const inverterManufacturerOptions = inverterManufacturers.map((el: string) => ({
    value: el,
    text: el,
  }));

  const moduleManufacturerOptions = moduleManufacturers.map((el: string) => ({
    value: el,
    text: el,
  }));

  const modules = pvModules
    ?.map((el: any) => ({
      value: el.id,
      text: el.name,
    }))
    ?.filter(
      (item: any, index: number, self: any) =>
        self.findIndex((obj: any) => obj.value === item.value) === index
    );

  async function searchConfigs() {
    if (!filter.moduleId || !filter.inverterId) {
      setError("Selecione módulo e inversor antes de buscar configurações.");
      return;
    }

    setConfig({});
    setActiveNumber(null);
    setError(null);
    setLoadingConfigs(true);

    try {
      const baseModule = pvModules.find((el: any) => el.id == filter.moduleId);
      const baseInverter = inverters.find(
        (el: any) => el.id == filter?.inverterId
      );

      if (!baseModule || !baseInverter) {
        throw new Error("Módulo ou inversor não encontrado.");
      }

      const formattedModule = formatModule(baseModule);
      const formattedInverter = recalcInverterFromModule(
        baseInverter,
        formattedModule
      );

      setSelectedModule(formattedModule);
      setSelectedInverter(formattedInverter);
    } catch {
      setError(
        "Erro ao buscar configurações. Verifique sua seleção e tente novamente."
      );
    } finally {
      setLoadingConfigs(false);
    }
  }

  function chooseConfig(n: number) {
    const myConfig = generateCombinations(
      selectedInverter.mppts.map((el: any) =>
        Object.keys(el.options).map((item) => parseInt(item))
      ),
      n
    );
    console.log(JSON.stringify({ myConfig }));

    setSelectedInverter({
      ...selectedInverter,
      mppts: selectedInverter.mppts.map((mppt: any, index: number) => ({
        ...mppt,
        selectedNumber: myConfig?.[index],
        selection: {
          number: parseInt(
            myConfig?.[index] ? myConfig?.[index]?.toString() : ""
          ),
          subSelection: 0,
        },
      })),
    });

    console.log(
      JSON.stringify(
        selectedInverter.mppts.map((mppt: any, index: number) => ({
          ...mppt,
          selectedNumber: myConfig?.[index],
          selection: { number: myConfig?.[index], subSelection: 0 },
        }))
      )
    );
    setConfig(myConfig);
  }

  function updateSelection(updatedInverter: any) {
    setActiveNumber(
      updatedInverter?.mppts?.reduce(
        (acc: any, curr: any) => acc + curr?.selection?.number,
        0
      )
    );
    setSelectedInverter(updatedInverter);
  }

  function getFinalConfig(inverter: any, module: any) {
    let dcPower = 0;

    for (let m = 0; m < inverter.mppts?.length; m++) {
      const mppt = inverter.mppts[m];

      dcPower +=
        module.dcPower *
        (mppt.selection?.number > 0 ? mppt.selection?.number : 0);
    }

    return { dcPower: Math.round(dcPower * 100) / 100 };
  }

  // Simple authorization check - can be replaced with proper auth later
  const checkAuthorization = () => {
    // For now, allow access to everyone
    // In a real implementation, this would check user session/role
    return true;
  };

  const authorized = checkAuthorization();

  return (
    <div className="container mx-auto px-6 py-8 pb-16 max-w-6xl">
      <DialogFinalConfiguration
        open={showFinalDialog}
        setOpen={setShowFinalDialog}
        selectedInverter={selectedInverter}
        selectedModule={selectedModule}
        getFinalConfig={getFinalConfig}
      />

      {!authorized && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-500 text-lg">Acesso não autorizado</p>
            <p className="text-gray-600 mt-2">
              Você não tem permissão para acessar esta página.
            </p>
          </div>
        </div>
      )}

      {authorized && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white border-b pb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Configurador Solar
            </h1>
            <p className="text-gray-600 mt-2">
              Configure seu sistema solar selecionando módulo e inversor
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="text-red-600 font-semibold">⚠️ Erro</div>
              </div>
              <p className="text-red-600 text-sm mt-1">{error}</p>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 text-sm underline mt-2"
              >
                Dispensar
              </button>
            </div>
          )}
          {/* Step 1: Product Selection */}
          <Card className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Seleção de Produtos
              </h2>
              <p className="text-gray-600 ml-9">
                Escolha o módulo e inversor para sua configuração
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <SelectObject
                  label={"Fabricante do Módulo"}
                  items={moduleManufacturerOptions}
                  disabled={false}
                  value={filter.moduleManufacturer}
                  onValueChange={(value: any) => {
                    setFilter((el) => ({ ...el, moduleManufacturer: value, moduleId: null }));
                    loadPvModules(value);
                  }}
                />
              </div>

              <div>
                <SelectObject
                  label={"Módulo"}
                  items={loading ? [] : modules}
                  disabled={!filter.moduleManufacturer || loading || loadingConfigs}
                  value={filter.moduleId}
                  placeholder={
                    !filter.moduleManufacturer
                      ? "Selecione um fabricante primeiro"
                      : loading
                      ? "Carregando..."
                      : pvModules?.length === 0
                      ? "Nenhum módulo encontrado"
                      : "Selecione um módulo"
                  }
                  onValueChange={(value: any) =>
                    setFilter((el) => ({ ...el, moduleId: value }))
                  }
                  loading={loading}
                />
              </div>

              <div>
                <SelectObject
                  label={"Fabricante do Inversor"}
                  items={inverterManufacturerOptions}
                  disabled={false}
                  value={filter.inverterManufacturer}
                  onValueChange={(value: any) => {
                    setFilter((el) => ({ ...el, inverterManufacturer: value }));
                    loadInverters(value);
                  }}
                />
              </div>

              <div>
                <SelectObject
                  label={"Inversor"}
                  items={loading ? [] : inverters.map((el: any) => ({
                    value: el.id,
                    text: el.name,
                  }))}
                  disabled={!filter.inverterManufacturer || loading || loadingConfigs}
                  value={filter.inverterId}
                  placeholder={
                    !filter.inverterManufacturer
                      ? "Selecione um fabricante primeiro"
                      : loading
                      ? "Carregando..."
                      : inverters?.length === 0
                      ? "Nenhum inversor encontrado"
                      : "Selecione um inversor"
                  }
                  onValueChange={(value: any) =>
                    setFilter((el) => ({ ...el, inverterId: value }))
                  }
                  loading={loading}
                />
              </div>

              <div className="flex items-end justify-end md:col-span-2">
                {filter.inverterId && filter.moduleId ? (
                  <Button
                    onClick={searchConfigs}
                    disabled={loadingConfigs}
                  >
                    {loadingConfigs ? (
                      <>
                        <LoadingIcon />
                        <span className="ml-2">Buscando...</span>
                      </>
                    ) : (
                      "Buscar Configurações"
                    )}
                  </Button>
                ) : (
                  <div className="text-gray-500 text-sm">
                    Selecione módulo e inversor
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Step 2: Product Specifications */}
          {(selectedModule || selectedInverter) && (
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    2
                  </span>
                  Especificações dos Produtos
                </h2>
                <p className="text-gray-600 ml-9">
                  Detalhes técnicos dos produtos selecionados
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {selectedModule && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                      Módulo
                    </h3>
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      {selectedModule.name}
                    </h4>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Imp (25ºC)
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule.imp)}A
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Isc (25ºC)
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule.isc)}A
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            VoC (25ºC)
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule?.voc)} V
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Vmp (25ºC)
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule?.vmp)} V
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">VoC (0ºC)</div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule?.vocTMin)} V
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            VoC (70ºC)
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedModule?.vocTMax)} V
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded">
                        <div className="text-sm text-gray-600">Vmp (70ºC)</div>
                        <div className="font-medium">
                          {formatDecimalBr(selectedModule?.vmpTMax)} V
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedInverter && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-blue-600 mb-2">
                      Inversor
                    </h3>
                    <h4 className="text-md font-medium text-gray-900 mb-4">
                      {selectedInverter.name}
                    </h4>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Potência AC
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedInverter.acPower)} kW
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Potência DC Máxima
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedInverter.dcMaxPower)} kWp
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">
                            Potência DC Mínima
                          </div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedInverter.dcMinPower)} kWp
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">Tensão AC</div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedInverter.acVoltage)} V
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded">
                          <div className="text-sm text-gray-600">Fases AC</div>
                          <div className="font-medium">
                            {formatDecimalBr(selectedInverter.acPhases)}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h5 className="font-semibold text-gray-900 mb-3">
                          MPPTs
                        </h5>
                        <div className="space-y-3">
                          {selectedInverter?.mppts.map(
                            (mppt: any, index: number) => (
                              <div
                                key={index}
                                className="bg-white p-3 rounded border-l-4 border-blue-500"
                              >
                                <div className="font-medium text-gray-900 mb-2">
                                  MPPT {index + 1}
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div>
                                    <span className="text-gray-600">
                                      Tensão máx:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {formatDecimalBr(mppt.dcVoltageMax)} V
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Tensão mín:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {formatDecimalBr(mppt.dcVoltageMin)} V
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Corrente máx:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {formatDecimalBr(mppt.dcCurrentMax)} A
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">
                                      Módulos:
                                    </span>
                                    <span className="ml-1 font-medium">
                                      {mppt.mMin}-{mppt.mMax}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}
          {/* Step 3: Module Configuration */}
          {selectedInverter?.optionsNModules && (
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    3
                  </span>
                  Configuração dos Módulos
                </h2>
                <p className="text-gray-600 ml-9">
                  Selecione a quantidade total de módulos para o sistema
                </p>
              </div>

              <div className="mb-8">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Opções de módulos disponíveis:
                </h3>
                <div className="py-4">
                  <NumberSelector
                    numbers={selectedInverter?.optionsNModules ?? []}
                    setNumber={(value: number | null) =>
                      value && chooseConfig(value)
                    }
                    activeNumber={activeNumber}
                    setActiveNumber={setActiveNumber}
                  />
                </div>
              </div>

              {(activeNumber ?? 0) > selectedInverter?.nMax && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="text-red-600 font-semibold">
                      ⚠️ Overload detectado
                    </div>
                  </div>
                  <p className="text-red-600 text-sm mt-1">
                    A quantidade de módulos selecionada excede a capacidade
                    máxima do inversor.
                  </p>
                </div>
              )}
            </Card>
          )}

          {/* Step 4: MPPT Configuration */}
          {(config?.[0] && selectedInverter?.mppts ? true : false) && (
            <Card className="p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                    4
                  </span>
                  Configuração dos MPPTs
                </h2>
                <p className="text-gray-600 ml-9">
                  Configure a distribuição dos módulos entre os MPPTs
                </p>
              </div>

              <div className="space-y-6">
                {selectedInverter.mppts.map((mppt: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      MPPT {index + 1}
                    </h3>
                    <MpptsSelector
                      mppt={mppt}
                      module={selectedModule}
                      numbers={Object.keys(mppt.options).map((el) =>
                        parseInt(el)
                      )}
                      activeSelection={mppt.selection}
                      options={mppt.options}
                      setActiveSelection={(newSelection: any) => {
                        updateSelection({
                          ...selectedInverter,
                          mppts: selectedInverter.mppts.map(
                            (el: any, i: number) => ({
                              ...el,
                              selection:
                                index == i ? newSelection : el.selection,
                            })
                          ),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Final Configuration Summary */}
          {selectedInverter &&
            selectedModule &&
            (getFinalConfig(selectedInverter, selectedModule)?.dcPower
              ? true
              : false) && (
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3">
                      ✓
                    </span>
                    Configuração Final
                  </h2>
                  <p className="text-gray-600 ml-9">
                    Resumo da configuração do sistema solar
                  </p>
                </div>

                <div className="bg-white rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {
                          getFinalConfig(selectedInverter, selectedModule)
                            ?.dcPower
                        }{" "}
                        kWp
                      </div>
                      <div className="text-gray-600 mt-1">
                        Potência DC Total
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {activeNumber || "-"}
                      </div>
                      <div className="text-gray-600 mt-1">Total de Módulos</div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {selectedInverter?.mppts?.length || 0}
                      </div>
                      <div className="text-gray-600 mt-1">MPPTs Utilizados</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Módulo:</span>
                          <span className="ml-2 font-medium">
                            {selectedModule?.name}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Inversor:</span>
                          <span className="ml-2 font-medium">
                            {selectedInverter?.name}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowFinalDialog(true)}
                        className="flex items-center gap-2"
                      >
                        <Info className="h-4 w-4" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
        </div>
      )}
    </div>
  );
}
