$(function () {
    let avatarUrl = '';
    let contactsList = [];
    const $contacts = $('.contacts');

    if (localStorage.contacts) {
        contactsList = JSON.parse(localStorage.contacts);

        contactsList.forEach(contact => render(contact));
    }

    contactsList.forEach(contact => {
        let bdateStr = contact.bdate;
        let bdatearr = bdateStr.split('-');
        bdatearr.shift();
        let bdate = bdatearr.toString();

        if (bdate == getTime()) {
            $('.show-birthdays')
                .append(`<p>${ contact.name }</p>`)
                .css("display", "block");
        }
    });

    $('.close').click(() => {
        $('.show-birthdays').css("display", "none")
    });

    $('#add-new-contact').click(() => {
        $('#create-new-contact').toggleClass('show-create-form');
    });

    $('#create-contact').click(() => {
        const name = $('#create-name').val();
        const tel = [];
        $('.create-tel').each(function(indx){
            tel.push($(this).val());
        });
        const email = $('#create-email').val();
        const bdate = $('#create-bdate').val();

        const contact = {
            avatarUrl,
            name,
            tel,
            email,
            bdate
        };

        contactsList.push(contact);

        render(contact);

        save();
    });

    $contacts.on('click', '.remove', function () {
        const $li = $(this).closest('li');
        const index = $li.index();

        $li.remove();

        contactsList.splice(index, 1);

        save();
    });

    $contacts.on('click', '.edit', function () {
        const $li = $(this).closest('li');
        const index = $li.index();
        const $contName = $li.children('.contact-name');
        const $contTel = $li.children('.contact-tel').children('span');
        const $contEmail = $li.children('.contact-email').children('span');
        const $contBdate = $li.children('.contact-bdate').children('span');

        let liName = $contName.text();
        let liTel = $contTel.text();
        let liEmail = $contEmail.text();
        let liBdate = $contBdate.text();

        $('#edit-name').val(liName);
        $('#edit-tel').val(liTel);
        $('#edit-email').val(liEmail);
        $('#edit-bdate').val(liBdate);

        $('.edit-form-wrapper').css("display", "block");

        $('#edit-yes').click(() => {
            editName = $('#edit-name').val();
            editTel = $('#edit-tel').val();
            editEmail = $('#edit-email').val();
            editBdate = $('#edit-bdate').val();  

            $contName.text(editName);
            $contTel.text(editTel);
            $contEmail.text(editEmail);
            $contBdate.text(editBdate);

            const editedName = $contName.text();
            const editedTel = $contTel.text();
            const editedEmail = $contEmail.text();
            const editedBdate = $contBdate.text();

            contactsList[index].name = editedName;
            contactsList[index].tel = editedTel.split(', ');
            contactsList[index].email = editedEmail;
            contactsList[index].bdate = editedBdate;

            save();

            $('.edit-form-wrapper').css("display", "none");
        });
    });

    $('#edit-no').click(() => {
        $('.edit-form-wrapper').css("display", "none");
    });

    $('#upload-file').change(function () {
        let file = this.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('load', () => {
            avatarUrl = reader.result;
        });
    });

    $('#add-more-tel').click(function() {
        $(this).before(`<input type="tel" pattern="^\\+?\\d+-?$" class="create-tel" placeholder="Enter the phone number">`);
    });

    $("#search-input").keyup(function() {
        const value = $(this).val().toLowerCase();
        $(".contacts li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });

    function render (contact) {
        $contacts.append(`<li>
            <div class="contact-avatar" style="background-image: url(${ contact.avatarUrl }); background-size: contain"></div>
            <div class="contact-name"> ${ contact.name }</div>
            <div class="contact-tel">tel.num.: <span>${ contact.tel.join(', ') }</span></div>
            <div class="contact-email">e-mail: <span>${ contact.email }</span></div>
            <div class="contact-bdate">birth date: <span>${ contact.bdate }</span></div>
            <button type="button" class="edit">Edit contact</button>
            <button type="button" class="remove">Delete contact</button>
        </li>`)
    }

    function save () {
        localStorage.contacts = JSON.stringify(contactsList);
    }

    function getTime () {
        let now = new Date();
        let result = now.getMonth() + 1 + "," + now.getDate();
      
        return result;
    }
});