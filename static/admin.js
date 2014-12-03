$(function() {
  $('form input:text').select();
  $('form').on('submit', function (e) {
    var data = parseInt($('form input:text').val());
    if(isNaN(data)) {
      alert('숫자만 입력해주세요.');
      $('form input:text').select();
      return false;
    } else
      $('form input:text').val(data);
  });
});
