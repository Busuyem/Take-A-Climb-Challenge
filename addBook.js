window.onload=function(){
	//buttons
	var quickAddBtn=document.getElementById("quickAdd");
	var addBtn=document.getElementById("add");
	var cancelBtn=document.getElementById("cancel");
	var quickAddFormDiv=document.querySelector(".quickAddForms");
	//or var quickAddFormDiv=document.getElementByClass('quickAddForm')[0];


	//Form Fields

	var fullname=document.getElementById("fullname");
	var phone=document.getElementById("phone");
	var address=document.getElementById("address");
	var email=document.getElementById("email");
	var city=document.getElementById("city");

	//Address Book Display

	var addBookDiv=document.querySelector(".addBook");

	//Create Storage Array
	var addressBook=[];

	//Create Event Listener

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display="block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display="none";
	});

	addBtn.addEventListener("click", addToBook);
	addBookDiv.addEventListener("click", removeEntry);
	addBookDiv.addEventListener("click", editEntry);
    
    function jsonStructure(fullname,phone,address,email,city){
		this.fullname=fullname;
		this.phone=phone;
		this.address=address;
		this.email=email;
		this.city=city;
	}
		function addToBook(){
			var isNull=fullname.value !='' && phone.value !='' && address.value != '' && email.value !='' && city.value !='';

		if (isNull){


		//Add the content of the form to the local storage

		var obj= new jsonStructure(fullname.value,phone.value,address.value,email.value,city.value);
		addressBook.push(obj);
		localStorage["addBook"]= JSON.stringify(addressBook);

		//Hide the form panel
		quickAddFormDiv.style.display="none";
		clearForm();
		

		//Clear the form
		//Updating and Displaying all records in the Addressbook
		showAddressBook();

		}

	}
    function removeEntry(e){
        if(e.target.classList.contains("delButton")){
        var remID= e.target.getAttribute("data-id");
        //Remove the JSON ENTRY FROM THE ARRAY WITH THE INDEX NUM=remID
        addressBook.splice(remID, 1);
        localStorage["addBook"]= JSON.stringify(addressBook);
       showAddressBook();
			}
		}

		function editEntry(e){
			if(e.target.classList.contains("editButton")){
			var editID= e.target.getAttribute("data-id");
			//Remove the JSON ENTRY FROM THE ARRAY WITH THE INDEX NUM=remID
			addressBook.splice(editID, 1);
			localStorage["addBook"]= JSON.stringify(addressBook);
		   showAddressBook();
				}
			}
	

		function clearForm(){
            var frm=document.querySelectorAll(".formFields");
            for(var i in frm){
                frm[i].value='';
            }

    
		}

		//SHOW ADDRESS BOOk
		function showAddressBook(){
			//check if the key 'addbook' exists in the localStorage or create it

			if (localStorage["addBook"] ===undefined){
			localStorage["addBook"]= "[]";


		}else{
			addressBook = JSON.parse(localStorage["addBook"]);
			addBookDiv.innerHTML='';
			for(var n in addressBook){
		var str='<div class="entry">';
			str+='<div class="name"><p>'+addressBook[n].fullname+'</p></div>';
			str+='<div class="phone"><p>'+addressBook[n].phone+'</p></div>';
			str+='<div class="address"><p>'+addressBook[n].address +'</p></div>';
			str+='<div class="city"><p>'+addressBook[n].city+'</p></div>';
			str+='<div class="email"><p>'+addressBook[n].email+'<p></div>';
			str+='<div class="del"><a href="#" class= "delButton" data-id="'+ n +'">Delete</div>';
			str+='<div class="edit"><a href="#" class= "editButton" data-id="'+ n +'">Edit</div>';
		str+='</div>';
		addBookDiv.innerHTML += str;
			}
		}
	}
	showAddressBook();
}