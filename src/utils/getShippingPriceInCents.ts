function isCapital(cityName: string) {
  let capital = capitals.find((el) => el.cityName == cityName);
  return capital ? true : false;
}

const capitals = [
  { stateShortName: "AC", cityName: "Rio Branco" },
  { stateShortName: "AL", cityName: "Maceió" },
  { stateShortName: "AP", cityName: "Macapá" },
  { stateShortName: "AM", cityName: "Manaus" },
  { stateShortName: "BA", cityName: "Salvador" },
  { stateShortName: "CE", cityName: "Fortaleza" },
  { stateShortName: "DF", cityName: "Brasília" },
  { stateShortName: "ES", cityName: "Vitória" },
  { stateShortName: "GO", cityName: "Goiânia" },
  { stateShortName: "MA", cityName: "São Luís" },
  { stateShortName: "MT", cityName: "Cuiabá" },
  { stateShortName: "MS", cityName: "Campo Grande" },
  { stateShortName: "MG", cityName: "Belo Horizonte" },
  { stateShortName: "PA", cityName: "Belém" },
  { stateShortName: "PB", cityName: "João Pessoa" },
  { stateShortName: "PR", cityName: "Curitiba" },
  { stateShortName: "PE", cityName: "Recife" },
  { stateShortName: "PI", cityName: "Teresina" },
  { stateShortName: "RJ", cityName: "Rio de Janeiro" },
  { stateShortName: "RN", cityName: "Natal" },
  { stateShortName: "RS", cityName: "Porto Alegre" },
  { stateShortName: "RO", cityName: "Porto Velho" },
  { stateShortName: "RR", cityName: "Boa Vista" },
  { stateShortName: "SC", cityName: "Florianópolis" },
  { stateShortName: "SP", cityName: "São Paulo" },
  { stateShortName: "SE", cityName: "Aracaju" },
  { stateShortName: "TO", cityName: "Palmas" },
];

export function getShippingPriceInCents(
  stateShortName: string,
  cityName: string,
  dcPower: number,
  itemsTotalPrice: number
) {
  return Math.round(
    100 *
      (getShippingPrice(
        stateShortName,
        cityName,
        dcPower,
        itemsTotalPrice / 100
      ) ?? 0)
  );
}

export function getShippingPrice(
  stateShortName: string,
  cityName: string,
  dcPower: number,
  itemsTotalPrice: number
) {
  const regions = [
    {
      name: "Norte",
      states: ["AM", "AC", "AP", "PA", "RO", "RR", "TO"],
      factorNotCapital: 8.5,
      factorCapital: 7.5,
    },
    {
      name: "Nordeste",
      states: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
      factorNotCapital: 7.5,
      factorCapital: 6.5,
    },
    {
      name: "Centro Oeste",
      states: ["GO", "MT", "MS", "DF"],
      factorNotCapital: 6.5,
      factorCapital: 5.5,
    },
    {
      name: "Sul",
      states: ["PR", "SC", "RS"],
      factorNotCapital: 6.5,
      factorCapital: 5.5,
    },
    {
      name: "Sudeste",
      states: ["ES", "MG", "RJ", "SP"],
      factorNotCapital: 3.0,
      factorCapital: 2.5,
    },
  ];

  if (!dcPower) dcPower = 0;
  if (!stateShortName || !cityName) {
    return 0;
  }

  for (let i = 0; i < regions.length; i++) {
    let region = regions[i];
    if (region.states.find((el) => el == stateShortName)) {
      if (isCapital(cityName)) {
        return (region.factorCapital / 100) * itemsTotalPrice;
      } else {
        return (region.factorNotCapital / 100) * itemsTotalPrice;
      }
    }
  }
  return (8.5 / 100) * itemsTotalPrice;
}

// export function getShippingPrice(
//   stateShortName: string,
//   cityName: string,
//   dcPower: number,
//   itemsTotalPrice: number
// ) {
//   const statesNordeste = ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"];
//   const statesNorte = ["AM", "AC", "AP", "PA", "RO", "RR", "TO"];
//   const statesCentro = ["GO", "MT", "MS", "DF"];
//   const statesSul = ["PR", "SC", "RS"];
//   const statesSudeste = ["ES", "MG", "RJ", "SP"];
//   const regions = [
//     {
//       name: "Norte",
//       states: ["AM", "AC", "AP", "PA", "RO", "RR", "TO"],
//       factorNotCapital: 8.5,
//       factorCapital: 7.5,
//     },
//     {
//       name: "Nordeste",
//       states: ["AL", "BA", "CE", "MA", "PB", "PE", "PI", "RN", "SE"],
//       factorNotCapital: 7.5,
//       factorCapital: 6.5,
//     },
//     {
//       name: "Centro Oeste",
//       states: ["GO", "MT", "MS", "DF"],
//       factorNotCapital: 6.5,
//       factorCapital: 5.5,
//     },
//     {
//       name: "Sul",
//       states: ["PR", "SC", "RS"],
//       factorNotCapital: 6.5,
//       factorCapital: 5.5,
//     },
//     {
//       name: "Sudeste",
//       states: ["ES", "MG", "RJ", "SP"],
//       factorNotCapital: 3.0,
//       factorCapital: 2.5,
//     },
//   ];

//   if (!dcPower) dcPower = 0;
//   if (!stateShortName || !cityName) {
//     return 0;
//   }

//   if (statesNordeste.find((el) => el == stateShortName)) {
//     if (isCapital(cityName)) {
//       return 0.045 * itemsTotalPrice;
//     } else {
//       return 0.055 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "PR") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0697675593159635 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0428980484785773 * itemsTotalPrice;
//       if (dcPower < 8) return 0.024071248987633 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0227073431050471 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0239748306282443 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0226305124744401 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0251021004658504 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0240596862771316 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0223792957726517 * itemsTotalPrice;
//       return 0.0223792957726517 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.11529260367597 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0700053989674261 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0382574670938125 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0360046757711847 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0382805458705815 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0360464416965905 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0402684016777979 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0385061346987594 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0356555600681337 * itemsTotalPrice;
//       return 0.0356555600681337 * itemsTotalPrice;
//     }
//   }
//   if (stateShortName == "SC") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0815578253636591 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0499347520920373 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0277723984556765 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0261784618654623 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0277037586040515 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0261292263718845 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0290518175969313 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0278236222240831 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0157856095278869 * itemsTotalPrice;
//       return 0.0157856095278869 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.122779706676066 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0744735071314098 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0406075893828147 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0382084262332142 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0406480644874472 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0382678473457615 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0427761821595526 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0408959098619745 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0378537319276398 * itemsTotalPrice;
//       return 0.0378537319276398 * itemsTotalPrice;
//     }
//   }
//   if (stateShortName == "RS") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0933500125888108 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0569714557054973 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0314735479237199 * itemsTotalPrice;
//       if (dcPower < 12) return 0.02964915706044 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0314326865798587 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0296279402693288 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0330014604726471 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0315875581710346 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0293035555014135 * itemsTotalPrice;
//       return 0.0293035555014135 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.137766720525966 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0834162005429683 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0453117424559542 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0426199611138209 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0453873684075332 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0427145319715785 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0477959862867884 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0456796956193979 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0422539248750447 * itemsTotalPrice;
//       return 0.0422539248750447 * itemsTotalPrice;
//     }
//   }
//   if (stateShortName == "SP") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0395973885463672 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0249401722949357 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0146586155788833 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0138984527010988 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0145760918745648 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0138565777989201 * itemsTotalPrice;
//       if (dcPower < 75) return 0.015202597941658 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0146284918245686 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0137095036993038 * itemsTotalPrice;
//       return 0.0137095036993038 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.0739305678939129 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0453233924292955 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0252751213248432 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0238297915144553 * itemsTotalPrice;
//       if (dcPower < 30) return 0.025200690643765 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0237742746724473 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0264145428301836 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0253038002508526 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0235118043775719 * itemsTotalPrice;
//       return 0.0235118043775719 * itemsTotalPrice;
//     }
//   }
//   if (stateShortName == "RJ") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0877632285466568 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0545537223279989 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0312800774145397 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0296089183438763 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0312205748318702 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0295693535741564 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0326422872711085 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0313521769553538 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0292693848511837 * itemsTotalPrice;
//       return 0.0292693848511837 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.128486518566902 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0778782940725077 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0423987968675187 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0398881657396925 * itemsTotalPrice;
//       if (dcPower < 30) return 0.042452708712142 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0399610148749647 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0446876566989436 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0427175267594978 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0395292660539084 * itemsTotalPrice;
//       return 0.0395292660539084 * itemsTotalPrice;
//     }
//   }
//   if (stateShortName == "MG") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0933500125888108 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0569714557054973 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0314735479237199 * itemsTotalPrice;
//       if (dcPower < 12) return 0.02964915706044 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0314326865798587 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0296279402693288 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0330014604726471 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0315875581710346 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0293035555014135 * itemsTotalPrice;
//       return 0.0293035555014135 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.13223007006695 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0801128879114655 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0435741371902438 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0409902426685346 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0436365500722355 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0410717176995502 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0459415115801232 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0439124143411053 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0406283607319078 * itemsTotalPrice;
//       return 0.0406283607319078 * itemsTotalPrice;
//     }
//   }

//   // if (stateShortName == "AL") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.16308106953311 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.0985161175676972 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.05324484294919 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0500582341015441 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0533811693962878 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0502138540253787 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0562647010743458 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0537492505195803 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.049674939775403 * itemsTotalPrice;
//   //     return 0.049674939775403 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.272578487155266 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.163801125965263 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0875173479925167 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0821914612645159 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0879218005736988 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0826155626129439 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0928628403840898 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0886199449978912 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0817384523971366 * itemsTotalPrice;
//   //     return 0.0817384523971366 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "BA") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.138814677085913 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.0840346540745327 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0456279676301942 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0429152265633327 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0457074109099622 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0430138459693216 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.048136634542691 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0460034657010667 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0425502306032774 * itemsTotalPrice;
//   //     return 0.0425502306032774 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.228041934338711 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.13722349296278 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0735372192512388 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0690819092756756 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0738376330203268 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0694010254825879 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.077945078951452 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0744037399470499 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0686621161495363 * itemsTotalPrice;
//   //     return 0.0686621161495363 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "CE") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.189130314659508 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.114059660842726 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0614210239219975 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.057725615651396 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.061618376636409 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0579424613630195 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0649894837208578 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0620637163551784 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0573227354658039 * itemsTotalPrice;
//   //     return 0.0573227354658039 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.316955856696892 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.190282682227811 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.10144666629704 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0952538159617478 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.101954931994136 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0957823635992839 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.107726713637401 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.102784752521272 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0947674956249873 * itemsTotalPrice;
//   //     return 0.0947674956249873 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "PB") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.207738839498677 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.125164458732717 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0672620744764275 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0632031638893081 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0675032284065556 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0634640100658257 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0712227018429899 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0680037766816529 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0627865305809554 * itemsTotalPrice;
//   //     return 0.0627865305809554 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.304471862618286 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.182831877070088 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0941919409701202 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0884509516396417 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0946465905785882 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0889252130697057 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.099985697892968 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0954078145988782 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0879820583182009 * itemsTotalPrice;
//   //     return 0.0879820583182009 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "PE") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.176020199699515 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.106237448916745 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0573065510934328 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0538669345156568 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0574729790465578 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0540530962185906 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0605987639757728 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0578794997354626 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0518041203397461 * itemsTotalPrice;
//   //     return 0.0518041203397461 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.293845006747182 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.176490812234321 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0941919409701202 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0884509516396417 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0946465905785882 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0889252130697057 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.099985697892968 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0954078145988782 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0879820583182009 * itemsTotalPrice;
//   //     return 0.0879820583182009 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "PI") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.232005231945873 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.139645922225882 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0748795360696936 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0703461714275195 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0751771592013686 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0706640181218827 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0793507683746448 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0757495615001665 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0699112397530811 * itemsTotalPrice;
//   //     return 0.0699112397530811 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.389830691836393 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.233769821459006 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.124320854896127 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.116704783300002 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.125000289615519 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.117404847832584 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.132136078729234 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.126046159264441 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.116163799071028 * itemsTotalPrice;
//   //     return 0.116163799071028 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "RN") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.187347461980306 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.112996447571233 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0608617182681858 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0572012416397555 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0610549278826134 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0574138620814358 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0643926933506355 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0614950353380938 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0567996489475287 * itemsTotalPrice;
//   //     return 0.0567996489475287 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.315259731457135 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.189270098159723 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.100913994245791 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0947544121411378 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.101418314133379 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0952789357120612 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.107158341856237 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.10224315155262 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0942693179885347 * itemsTotalPrice;
//   //     return 0.0942693179885347 * itemsTotalPrice;
//   //   }
//   // }
//   // if (stateShortName == "SE") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.149972875750573 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.0906927721520881 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0491303701206253 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0461995529658049 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0492357718064366 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0463244888809499 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0518739813292608 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0495650338998644 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0458262222804927 * itemsTotalPrice;
//   //     return 0.0458262222804927 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.249467637205555 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.150009255971773 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0802626226655967 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.0753885969424098 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0806132950548293 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0757584120833658 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0851218246396567 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0812430070754973 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0749530150903502 * itemsTotalPrice;
//   //     return 0.0749530150903502 * itemsTotalPrice;
//   //   }
//   // }

//   if (stateShortName == "DF") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.171632230389928 * itemsTotalPrice;
//       if (dcPower < 4) return 0.104090619560448 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0567753866045928 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0524191878502389 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0534830037123408 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0499719228507549 * itemsTotalPrice;
//       if (dcPower < 75) return 0.055396358833537 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0527365303512805 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0487062753266587 * itemsTotalPrice;
//       return 0.0487062753266587 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.173817158065286 * itemsTotalPrice;
//       if (dcPower < 4) return 0.103679756557981 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0545017312311236 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0510481065290109 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0546816882178488 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0512466349227747 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0578291590762747 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0550958218584538 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0506668159461787 * itemsTotalPrice;
//       return 0.0506668159461787 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "GO") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.151824890818192 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0922909925282123 * itemsTotalPrice;
//       if (dcPower < 8) return 0.050584916585098 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0468221941589483 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0479353596520345 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0448520172702001 * itemsTotalPrice;
//       if (dcPower < 75) return 0.049698670405326 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0473572983238866 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0437887880748848 * itemsTotalPrice;
//       return 0.0437887880748848 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.208497155685966 * itemsTotalPrice;
//       if (dcPower < 4) return 0.126009502238581 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0682077069565069 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0631741799115126 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0651606699048645 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0609362346818354 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0678203245448688 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0645775400423534 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0595876476966882 * itemsTotalPrice;
//       return 0.0595876476966882 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "MT") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.20675327546373 * itemsTotalPrice;
//       if (dcPower < 4) return 0.124423156515707 * itemsTotalPrice;
//       if (dcPower < 8) return 0.066753774684127 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0620713970402746 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0647688650200169 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0605535813326641 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0676820575188711 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0644735392250956 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0594381007995165 * itemsTotalPrice;
//       return 0.0594381007995165 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.322554716711627 * itemsTotalPrice;
//       if (dcPower < 4) return 0.19341003408842 * itemsTotalPrice;
//       if (dcPower < 8) return 0.102927427596739 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0953708007016322 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0991822422769005 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0925866590633628 * itemsTotalPrice;
//       if (dcPower < 75) return 0.103620179782898 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0985649659126188 * itemsTotalPrice;
//       if (dcPower < 300) return 0.090694697048857 * itemsTotalPrice;
//       return 0.090694697048857 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "MS") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.182880724395021 * itemsTotalPrice;
//       if (dcPower < 4) return 0.110177458865261 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0592617757846929 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0550609654840046 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0572715504247881 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0535254862057809 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0597541834518324 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0569221893069562 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0524944593309739 * itemsTotalPrice;
//       return 0.0524944593309739 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.27770528642366 * itemsTotalPrice;
//       if (dcPower < 4) return 0.166651042745383 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0888568451109098 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0822253464995169 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0851711007015215 * itemsTotalPrice;
//       if (dcPower < 50) return 0.079460999095879 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0888224291643248 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0844752895930759 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0777420435081047 * itemsTotalPrice;
//       return 0.0777420435081047 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "TO") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.22722726361271 * itemsTotalPrice;
//       if (dcPower < 4) return 0.136609303511246 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0731412328584233 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0677704700020058 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0702405210373801 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0655681847481624 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0732282650020463 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0696881446286202 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0641920282131208 * itemsTotalPrice;
//       return 0.0641920282131208 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.289687944670882 * itemsTotalPrice;
//       if (dcPower < 4) return 0.17378555032107 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0925972749550595 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0855807915559258 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0884342952462206 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0824602107758389 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0921479380155707 * itemsTotalPrice;
//       if (dcPower < 150) return 0.087607295420108 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0806006029878218 * itemsTotalPrice;
//       return 0.0806006029878218 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "AC") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.315778174916342 * itemsTotalPrice;
//       if (dcPower < 4) return 0.189426519728449 * itemsTotalPrice;
//       if (dcPower < 8) return 0.100902492102965 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0926956017378685 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0973703200699047 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0909191863511525 * itemsTotalPrice;
//       if (dcPower < 75) return 0.101746854821378 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0968039805452623 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0890966085230209 * itemsTotalPrice;
//       return 0.0890966085230209 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.528856241019266 * itemsTotalPrice;
//       if (dcPower < 4) return 0.31646490669549 * itemsTotalPrice;
//       if (dcPower < 8) return 0.167613580436654 * itemsTotalPrice;
//       if (dcPower < 12) return 0.155501763793531 * itemsTotalPrice;
//       if (dcPower < 30) return 0.162597509256071 * itemsTotalPrice;
//       if (dcPower < 50) return 0.151869506336009 * itemsTotalPrice;
//       if (dcPower < 75) return 0.170335372335201 * itemsTotalPrice;
//       if (dcPower < 150) return 0.162013897144856 * itemsTotalPrice;
//       if (dcPower < 300) return 0.148978786053933 * itemsTotalPrice;
//       return 0.148978786053933 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "PA") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.272647741028324 * itemsTotalPrice;
//       if (dcPower < 4) return 0.16369517167285 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0873742133171102 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0809374251925205 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0839831567583947 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0783885584656748 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0876300188298747 * itemsTotalPrice;
//       if (dcPower < 150) return 0.083368861467973 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0767494666027967 * itemsTotalPrice;
//       return 0.0767494666027967 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.702785010346284 * itemsTotalPrice;
//       if (dcPower < 4) return 0.420681181677607 * itemsTotalPrice;
//       if (dcPower < 8) return 0.222757979939253 * itemsTotalPrice;
//       if (dcPower < 12) return 0.211355926153517 * itemsTotalPrice;
//       if (dcPower < 30) return 0.100690515903269 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0938710335171649 * itemsTotalPrice;
//       if (dcPower < 75) return 0.104944329743147 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0997493603093328 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0917374530203844 * itemsTotalPrice;
//       return 0.0917374530203844 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "AM") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.32570105647677 * itemsTotalPrice;
//       if (dcPower < 4) return 0.195149508862528 * itemsTotalPrice;
//       if (dcPower < 8) return 0.103644496864891 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0965847795851086 * itemsTotalPrice;
//       if (dcPower < 30) return 0.101841897626403 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0942523626070778 * itemsTotalPrice;
//       if (dcPower < 75) return 0.105800529463758 * itemsTotalPrice;
//       if (dcPower < 150) return 0.100427208606346 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0924485104834348 * itemsTotalPrice;
//       return 0.0924485104834348 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.745191800725862 * itemsTotalPrice;
//       if (dcPower < 4) return 0.44548625280397 * itemsTotalPrice;
//       if (dcPower < 8) return 0.233027830084565 * itemsTotalPrice;
//       if (dcPower < 12) return 0.21835201699426 * itemsTotalPrice;
//       if (dcPower < 30) return 0.228467269612414 * itemsTotalPrice;
//       if (dcPower < 50) return 0.21336988593035 * itemsTotalPrice;
//       if (dcPower < 75) return 0.239471431232261 * itemsTotalPrice;
//       if (dcPower < 150) return 0.227719130228462 * itemsTotalPrice;
//       if (dcPower < 300) return 0.209307742649538 * itemsTotalPrice;
//       return 0.209307742649538 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "RO") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.282901065111191 * itemsTotalPrice;
//       if (dcPower < 4) return 0.169804680770233 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0905793747525282 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0838430840938565 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0868796624315761 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0810650800931573 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0906118915307605 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0861860641167908 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0793260622293416 * itemsTotalPrice;
//       return 0.0793260622293416 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.339834335659064 * itemsTotalPrice;
//       if (dcPower < 4) return 0.203695642831217 * itemsTotalPrice;
//       if (dcPower < 8) return 0.108318917457183 * itemsTotalPrice;
//       if (dcPower < 12) return 0.100183310863084 * itemsTotalPrice;
//       if (dcPower < 30) return 0.103807166182018 * itemsTotalPrice;
//       if (dcPower < 50) return 0.096826173011531 * itemsTotalPrice;
//       if (dcPower < 75) return 0.108310007211003 * itemsTotalPrice;
//       if (dcPower < 150) return 0.102975079816723 * itemsTotalPrice;
//       if (dcPower < 300) return 0.094715566034674 * itemsTotalPrice;
//       return 0.094715566034674 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "RR") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.571746253271358 * itemsTotalPrice;
//       if (dcPower < 4) return 0.342082635909758 * itemsTotalPrice;
//       if (dcPower < 8) return 0.181131194614355 * itemsTotalPrice;
//       if (dcPower < 12) return 0.131717414799586 * itemsTotalPrice;
//       if (dcPower < 30) return 0.175272365691005 * itemsTotalPrice;
//       if (dcPower < 50) return 0.163649347266949 * itemsTotalPrice;
//       if (dcPower < 75) return 0.183502902986025 * itemsTotalPrice;
//       if (dcPower < 150) return 0.174500335007325 * itemsTotalPrice;
//       if (dcPower < 300) return 0.160433958526309 * itemsTotalPrice;
//       return 0.160433958526309 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.670271369018886 * itemsTotalPrice;
//       if (dcPower < 4) return 0.400737161786426 * itemsTotalPrice;
//       if (dcPower < 8) return 0.211851603443392 * itemsTotalPrice;
//       if (dcPower < 12) return 0.195852220953594 * itemsTotalPrice;
//       if (dcPower < 30) return 0.203406230895103 * itemsTotalPrice;
//       if (dcPower < 50) return 0.189693491290041 * itemsTotalPrice;
//       if (dcPower < 75) return 0.212586675141786 * itemsTotalPrice;
//       if (dcPower < 150) return 0.202002203749091 * itemsTotalPrice;
//       if (dcPower < 300) return 0.18559469361301 * itemsTotalPrice;
//       return 0.18559469361301 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "AP") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.488463210552178 * itemsTotalPrice;
//       if (dcPower < 4) return 0.292550272635823 * itemsTotalPrice;
//       if (dcPower < 8) return 0.155203215012863 * itemsTotalPrice;
//       if (dcPower < 12) return 0.145196961282985 * itemsTotalPrice;
//       if (dcPower < 30) return 0.154477660506201 * itemsTotalPrice;
//       if (dcPower < 50) return 0.144797511753 * itemsTotalPrice;
//       if (dcPower < 75) return 0.162855827411534 * itemsTotalPrice;
//       if (dcPower < 150) return 0.155215181406393 * itemsTotalPrice;
//       if (dcPower < 300) return 0.14293042874378 * itemsTotalPrice;
//       return 0.14293042874378 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.56962362663636 * itemsTotalPrice;
//       if (dcPower < 4) return 0.340914817738269 * itemsTotalPrice;
//       if (dcPower < 8) return 0.180568008383231 * itemsTotalPrice;
//       if (dcPower < 12) return 0.168841654701247 * itemsTotalPrice;
//       if (dcPower < 30) return 0.179598285139488 * itemsTotalPrice;
//       if (dcPower < 50) return 0.168309059669664 * itemsTotalPrice;
//       if (dcPower < 75) return 0.188411249810075 * itemsTotalPrice;
//       if (dcPower < 150) return 0.180437716709874 * itemsTotalPrice;
//       if (dcPower < 300) return 0.166099839006891 * itemsTotalPrice;
//       return 0.166099839006891 * itemsTotalPrice;
//     }
//   }

//   if (stateShortName == "ES") {
//     if (isCapital(cityName)) {
//       if (dcPower < 2) return 0.0808930979638705 * itemsTotalPrice;
//       if (dcPower < 4) return 0.04947002134437 * itemsTotalPrice;
//       if (dcPower < 8) return 0.0274376358473678 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0258654470071405 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0273905017739597 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0258279390708196 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0287356382518515 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0275149222637733 * itemsTotalPrice;
//       if (dcPower < 300) return 0.025544104237399 * itemsTotalPrice;
//       return 0.025544104237399 * itemsTotalPrice;
//     } else {
//       if (dcPower < 2) return 0.11787430023832 * itemsTotalPrice;
//       if (dcPower < 4) return 0.0714821740262156 * itemsTotalPrice;
//       if (dcPower < 8) return 0.038957087722969 * itemsTotalPrice;
//       if (dcPower < 12) return 0.0366537393797158 * itemsTotalPrice;
//       if (dcPower < 30) return 0.0389993184180183 * itemsTotalPrice;
//       if (dcPower < 50) return 0.0367138055520789 * itemsTotalPrice;
//       if (dcPower < 75) return 0.0410446884815604 * itemsTotalPrice;
//       if (dcPower < 150) return 0.0392388261035823 * itemsTotalPrice;
//       if (dcPower < 300) return 0.0363167700235012 * itemsTotalPrice;
//       return 0.0363167700235012 * itemsTotalPrice;
//     }
//   }
//   // if (stateShortName == "MA") {
//   //   if (isCapital(cityName)) {
//   //     if (dcPower < 2) return 0.252552224838183 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.151906879536899 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.0813291393166357 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.076394262309761 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.0816747399527069 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.0767605518198988 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.0862329783887444 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.0823081435641182 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.0759439394519234 * itemsTotalPrice;
//   //     return 0.0759439394519234 * itemsTotalPrice;
//   //   } else {
//   //     if (dcPower < 2) return 0.427121661104468 * itemsTotalPrice;
//   //     if (dcPower < 4) return 0.256024001164375 * itemsTotalPrice;
//   //     if (dcPower < 8) return 0.13602679782531 * itemsTotalPrice;
//   //     if (dcPower < 12) return 0.127681985857708 * itemsTotalPrice;
//   //     if (dcPower < 30) return 0.136793246596445 * itemsTotalPrice;
//   //     if (dcPower < 50) return 0.128469583529793 * itemsTotalPrice;
//   //     if (dcPower < 75) return 0.144627033387897 * itemsTotalPrice;
//   //     if (dcPower < 150) return 0.13794966636474 * itemsTotalPrice;
//   //     if (dcPower < 300) return 0.127112859247515 * itemsTotalPrice;
//   //     return 0.127112859247515 * itemsTotalPrice;
//   //   }
//   // }
// }
