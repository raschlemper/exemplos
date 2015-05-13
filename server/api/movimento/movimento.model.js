'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MovimentoSchema = new Schema({
    ic_tipo_documento: String,
    id_mensalidade: Number,
    nr_documento: Number,
    nr_titulo: Number,
    sequencia_titulo: Number,
    id_estrutura_servico: Number,
    nr_ano: Number,
    nr_semestre: Number,
    cd_instituicao_ensino: Number,
    nm_instituicao_ensino: String,
    cd_tipo_curso: Number,
    ds_tipo_curso: String,
    cd_curso: Number,
    nm_curso: String,
    cd_curso_instituicao: Number,
    id_tipo_receita_despesa: Number,
    ds_tipo_receita_despesa: String,
    cd_aluno: Number,
    nm_aluno: String,
    id_responsavel_financeiro: Number,
    nm_responsavel_financeiro: String,
    dt_vencimento: Date,
    dt_pagamento: Date,
    caixa: Number,
    banco: Number,
    ajuste: Number,
    previsao_nao_confirmado: Number,
    previsao_confirmado: Number,
    previsao_desconto_nao_confirmado: Number,
    previsao_desconto_confirmado: Number,
    desconto_concedido: Number,
    juros_calculado: Number,
    multa_calculado: Number,
    nota_promissoria: Number,
    fies: Number,
    cobranca: Number,
    dif_nao_confirmado: Number,
    perdas: Number,
    dinheiro: Number,
    cartao_debito: Number,
    cartao_credito: Number,
    cheque: Number,
    cheque_pre: Number,
    bolsa_condicional_nao_confirmado: Number,
    bolsa_incondicional_nao_confirmado: Number,
    bolsa_condicional_confirmado: Number,
    bolsa_incondicional_confirmado: Number,
    previsao_diversos_nao_confirmado: Number,
    previsao_diversos_confirmado: Number,
    dif_confirmado: Number,
    desconto_calculado: Number,
    permuta: Number,
    desconto_nao_previsto: Number
});


var Movimento = mongoose.model('Movimento', MovimentoSchema);

/**
 * Virtuals
 */


/**
 * Validations
 */


/**
 * Pre-save hook
 */


/**
 * Methods
 */
MovimentoSchema.methods = {};

module.exports = mongoose.model('movimentos', MovimentoSchema);

