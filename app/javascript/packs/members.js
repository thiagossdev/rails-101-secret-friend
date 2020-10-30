$(document).on('turbolinks:load', () => {
  $('#member_email, #member_name').on('keypress', (e) => {
    if (e.key === 'Enter' && valid_email($('#member_email').val()) && $( '#member_name').val() !== '') {
      $('.new_member').trigger('submit');
     }
  });

  $('#member_email, #member_name').on('blur', () => {
    if (valid_email($('#member_email').val()) && $('#member_name').val() !== '') {
      $('.new_member').trigger('submit');
    }
  });

  add_event_update_member($('.member:not(.member-new)'));

  $('body').on('click', 'a.remove_member', (e) => {
    e.preventDefault();

    $.ajax('/members/'+ e.currentTarget.id, {
      type: 'DELETE',
      dataType: 'json',
      data: {},
      success: (data, text, jqXHR) => {
        M.toast({html: 'Membro removido', classes: 'green'});
        $('#member_' + e.currentTarget.id).remove();
      },
      error: (jqXHR, textStatus, errorThrown) =>
        M.toast({html: 'Problema na remoção de membro', classes: 'red'})
    });

    return false;
  });

  $('.new_member').on('submit', (e) => {
    $.ajax(e.target.action, {
      type: 'POST',
      dataType: 'json',
      data: $('.new_member').serialize(),
      success: (data, text, jqXHR) => {
        insert_member(data['id'], data['name'],  data['email']);
        $('#member_name, #member_email').val('');
        $('#member_name').trigger('focus');

        M.toast({html: 'Membro adicionado', classes: 'green'})
      },
      error: (jqXHR, textStatus, errorThrown) =>
        M.toast({html: 'Problema na hora de incluir membro', classes: 'red'})
    });

    return false;
  });

  function valid_email(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email);
  }

  function insert_member(id, name, email) {
    $('.member_list').append(
      `<div class="member" id="member_${id}" data-id="${id}">
        <div class="row">
          <div class="col s12 m5 input-field">
            <input id="name" type="text" class="validate" value="${name}">
            <label for="name" class="active">Nome</label>
          </div>
          <div class="col s12 m5 input-field">
            <input id="email" type="email" class="validate" value="${email}">
            <label for="email" class="active" data-error="Formato incorreto">Email</label>
          </div>
          <div class="col s3 offset-s3 m1 input-field">
            <i class="material-icons icon">visibility</i>
          </div>
          <div class="col s3 m1 input-field">
            <a href="#" class="remove_member" id="${id}">
              <i class="material-icons icon">delete</i>
            </a>
          </div>
        </div>
      </div>`
    );
  }

  function add_event_update_member(members) {
    $(members).each((index, member) => {
      member = $(member);
      member.find('#email, #name').on('blur', () => {
        if (valid_email(member.find('#email').val()) && member.find('#name').val() !== '') {
          update_member(member);
        }
      });
    });
  }

  function update_member(member) {
    $.ajax('/members/'+ member.data('id'), {
      type: 'PUT',
      dataType: 'json',
      data: {
        member: {
          email: member.find('#email').val(),
          name: member.find('#name').val()
        }
      },
      success: (data, text, jqXHR) => {
        M.toast({html: 'Membro atualizado', classes: 'green'});
      },
      error: (jqXHR, textStatus, errorThrown) =>
        M.toast({html: 'Problema na atualização de membro', classes: 'red'})
    });
  }

  return;
});
