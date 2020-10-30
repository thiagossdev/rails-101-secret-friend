$(document).on('turbolinks:load', () => {
  let i18n = {
    today: 'Hoje',
    cancel: 'Cancelar',
    clear: 'Limpar',
    done: 'Ok',
    nextMonth: 'Próximo mês',
    previousMonth: 'Mês anterior',
    weekdaysAbbrev: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekdays: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
    monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  }

  $('.datepicker').datepicker({
    selectMonths: true,
    selectYears: 5,
    i18n: i18n,
    autoClose: true,
    format: 'dd/mm/yyyy'
  });

  $('.timepicker').timepicker({
    i18n: i18n,
    twelveHour : false,
    autoclose: true
  });
  return;
})
