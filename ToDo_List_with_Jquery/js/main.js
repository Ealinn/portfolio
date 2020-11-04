const $showHide = $("#show-hide-button");

$showHide.click(() => {
  $list.toggleClass("hide-done");
});

const $add = $("#todo-add-button");
const $input = $("#new-todo");
const $list = $(".todo-list");

$add.click(() => {
  const $li = $(`<li>
    ${$input.val()}
    <div class="buttons">
      <button class="done">done</button>
      <button class="delete">delete</button>
    </div>
  </li>`);
  $input.val("");
  $list.append($li);
});

$(".todo-list").on("click", ".done", function () {
  $(this).closest("li").toggleClass("done-item");
});

$(".todo-list").on("click", ".delete", function () {
  $(this).closest("li").remove();
});
