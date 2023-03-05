
$(document).ready(()=>{     
    $('#categoryList').select2({tags: true,selectOnClose: true});

    loadCategoryData();
    function loadCategoryData(){
    $.ajax({
        url:'/admin/category/view_all',
        type:"GET",
        success: function(data){

            // console.log("data lenght " + data['data'].length);
            // console.log(data);
            if (data['data'].length>=1){

            var selectData=`<option disabled selected value="0">Add Category</option>`;
            var slNo=1;var tableData='';

            data.data.forEach(element => {
                var status=1;    
                status=element.status=='1'?'Active':'Inactive';

                selectData+=`<option value="${element.id}">${element.category}</option>`;

                tableData+=`<tr>
                <th scope="row">${slNo}</th>
                <td>${element.id}</td>
                <td>${element.category}</td>
                <td style="text-align:center;"><img src="/adminImg/${element.img}" alt="error" style="width:30%;max-height: 25%;border:2px solid rgb(80, 194, 209);border-radius:10px;"></td>
                <td>${element.uid}</td>
                <td><a class="btn mybtn ml_15px status ${status}" id="${"act" + element.uid}" href="javascript: void(0)">${status}</a><a class="btn btn-primary ml_15px edit-btn" id=${"edit" + element.uid}" href="javascript: void(0)">Edit</a><a class="btn btn-danger ml_15px delete-btn" id=${"del" + element.uid}" href="javascript: void(0)">Delete</a></td></tr>`;
                slNo++;
            });
            $('#catImage').val('');
            $('#categoryList').html(selectData);
            $('#categoryList').select2({tags: true,selectOnClose: true});

                $('#dataTable').DataTable().destroy();
                $('#dataTable tbody').html(tableData);
                $('#dataTable').DataTable().draw();
                
            }else if (data['data']=='unauthorized user') {
                window.location.replace("/admin/login");
            }else if (data['data']=='failed') {
                alert ("Failed while fetching all data");
            }else{
                alert("error occured no data found");
            }
        }
        
    });
};

    


// delete ajax requests
$(document).on("click",".delete-btn",function(){
    if (confirm("Are you sure to delete?")){
        var btnId=$(this).attr("id");
        var deleteId=btnId.substring(3,btnId.length-1)
        $.ajax({
            url:"/admin/category/delete",
            type:"POST",
            data:{uid:deleteId},
            success:function(data){

                if(data['data']=='success'){
                    alert("Deleted Successfully")
                    loadCategoryData()
                }else if (data['data']=='failed'){
                    alert ("Failed while deleting");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");}
                else  {
                    alert("Failed while deleting")
                }
            }
        })
    }

})



// EDIT Category
$(document).on("click",".edit-btn",function(){
    
    // var btnId=$(this).attr("id");
    // var editId=btnId.substring(4,btnId.length-1)
    pId=$(this).parent().siblings()[1].innerText;
    ptext=$(this).parent().siblings()[2].innerText;
    pImg=$(this).parent().siblings()[3].getElementsByTagName('img')[0].getAttribute('src');

    $('#updateCatText').val(ptext);
    $('#updateCatId').val(pId);
    $('#updateCatImgPreview').attr('src',pImg).css({'width':'200px','height':'150px','display':'block','cursor':'pointer'});

})



// Update ajax requests
$(document).on("click","#btnEditCategory",function(){
    var textValue=$("#updateCatText").val();
    var id=$("#updateCatId").val();
    var updatedCatImg=$("#updateCatImg").val();

    if(textValue=='' || id=='' || updatedCatImg==''){
    alert("Kindly update all the fields!");
    return;
    };

    var dataToSend=new FormData();
    dataToSend.append('imageToUpload',document.getElementById('updateCatImg').files[0]);
    dataToSend.append('textValue',textValue);
    dataToSend.append('id',id);


    if (confirm("Are you sure to Update?")){
        $.ajax({
            url:"/admin/category/edit",
            type:"POST",
            data:dataToSend,
            contentType:false,
            cahce:false,
            processData: false,
            success:function(data){

                if(data['data']=='success'){
                    alert("Data Updated Successfully")
                    $("#updateCatText").val('');
                    $("#updateCatId").val('');
                    $("#updateCatImg").val('');
                    $("#updateCatImgPreview").css('display','none');
                    
                    loadCategoryData()
                }else if (data['data']=='failed'){
                    alert ("Failed while updating");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");}
                else{
                    alert("Failed while updating")
                };
            }
        })
    }

})



// Activate or Deactivate toggle ajax requests
$(document).on("click",".status",function(){

var status=0;
status=$(this).hasClass('Inactive')?0:1

    var btnId=$(this).attr("id");
    var statusId=btnId.substring(3,btnId.length)

    $.ajax({
        url:"/admin/category/status",
        type:"POST",
        data:{uid:statusId,status:status},
        success:function(data){

            if(data['data']=='success'){
                loadCategoryData()
            }else if (data['data']=='failed'){
                alert ("Failed while changing status");
            }else if (data['data']=='unauthorized user') {
                window.location.replace("/admin/login");
            }else{
                alert("failed while chaging status");
            }
        }
    })


});



// add category to db
        $("#btnAddCategory").on('click', function(){
        const categoryValue=$("#categoryList :selected").text();
        const catImg=$("#catImage").val();

        if (categoryValue =='' || categoryValue=='Add Category' || catImg==''){
            alert("Kindly enter category name and image");
            return;
        };

        var dataToSend=new FormData();
        dataToSend.append('imageToUpload',document.getElementById('catImage').files[0]);
        dataToSend.append('categoryValue',categoryValue)

        // for (var value of dataToSend.values()) {
        //     console.log(value);
        //  }
        // return;
        // console.log(dataToSend);
        // return;

        $.ajax({
            url:"/admin/category/addNew",
            type:"POST",
            data:dataToSend,
            contentType:false,
            cahce:false,
            processData: false,
            // data:{categoryValue:categoryValue},
            success:function(data){
                if(data['data']=='success'){
                    loadCategoryData();
                    alert("Successfully added to the list");
                }else if (data['data']=='failed'){
                    alert ("Failed while add");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");
                }else{
                    alert("error occured");
                }

        }
    });

    });



});



function validateImage(element,size){
    // $(document).on('change',element,()=>{
        var name = element.files[0].name;
        var ext = name.split('.').pop().toLowerCase();
        if(jQuery.inArray(ext, ['gif','png','jpg','jpeg']) == -1) 
        {
         alert("Invalid Image File");
         element.value="";
         return;
        }; 
        var oFReader = new FileReader();
        oFReader.readAsDataURL(element.files[0]);
        var f = element.files[0];
        var fsize = f.size||f.fileSize;
        if(fsize > size) //1000000
        {
        alert("Image File Size is very big");
        element.value="";
        return;
        } 
    // });
};