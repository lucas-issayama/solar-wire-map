export function calcPricesCordeiro() {
  let costKgCobreNu = 0.026754;
  let lmeStandard = 2500;
  let usdStandard = 5.4;
  let lme = 2700;
  let usd = 6.2;

  //
  let premioCobreNuIcms = 600;

  let metalEffect =
    (costKgCobreNu * (lme * usd - lmeStandard * usdStandard)) / 1000;

  let priceManual = 12;
  let priceUnit = 14.93;
  let discount = 0.1962;

  //let priceAfterDiscount = priceUnit * (1 - discount);
  let priceAfterDiscount = 12;
  //let taxCost = 0.064;
  let taxCost = 3.8198;
  let priceAfterTaxes = priceAfterDiscount - taxCost;

  let priceSellStd = priceAfterTaxes - metalEffect;

  let costMo = 0.0286;
  let costDespVar = 0.0196;
  let costSucata = 0;
  let costOutrasMP = 0.2607;
  let costMetalSemEfeitoMetal = 0.361179; // Custo metal sem efeito metal
  let costTotal =
    costMo + costDespVar + costSucata + costOutrasMP + costMetalSemEfeitoMetal;

  let premioMetal = ((costKgCobreNu * premioCobreNuIcms) / 1000) * usd;

  let costCpv = costTotal + premioMetal;

  let mcCommercial = priceSellStd - costCpv;

  //Custos variáveis
  let commission = 0.01;
  let costCommission = priceAfterDiscount * commission;
  let costShipping = 0; ///GKO
  let costEmabalagem = 0; // SAP - levantar embalagens
  //let costFinanceiro = 0.28; // Pelo cálculo de pagamento
  let costFinanceiro = (0.079 / 100) * 30 * priceAfterDiscount; // Pelo cálculo de pagamento

  let costVariaveis =
    costCommission + costShipping + costEmabalagem + costFinanceiro;

  let mc = mcCommercial - costVariaveis;
}
