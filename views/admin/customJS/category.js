
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

                // tableData+=`<tr>
                // <th scope="row">${slNo}</th>
                // <td>${element.id}</td>
                // <td>${element.category}</td>
                // <td style="text-align:center;"><img src="/adminImg/${element.img}" alt="error" style="width:30%;max-height: 25%;border:2px solid rgb(80, 194, 209);border-radius:10px;"></td>
                // <td>${element.uid}</td>
                // <td><a class="btn mybtn ml_15px status ${status}" id="${"act" + element.uid}" href="javascript: void(0)">${status}</a><a class="btn btn-primary ml_15px edit-btn" id=${"edit" + element.uid}" href="javascript: void(0)">Edit</a><a class="btn btn-danger ml_15px delete-btn" id=${"del" + element.uid}" href="javascript: void(0)">Delete</a></td></tr>`;
                // slNo++;

                tableData+=`<tr>
                <td>${slNo}</td>
                <td>${element.id}</td>
                <td>${element.category}</td>
                <td>${element.uid}</td>
                <td>
                  <img class="img-thumbnail" width="100px" style="max-height: 50px;" src="/adminImg/${element.img}" alt="error Image" >
                </td>
                <td>
                  <button type="button" class="Activate btn ${status=="Active"?'btn-success':'btn-secondary'}" id="${"act" + element.uid}">${status}</button>
                  <button type="button" class="btn btn-primary" id=${"edit" + element.uid}">Edit</button>
                  <button type="button" class="btn btn-danger" id=${"del" + element.uid}">Delete</button>
                </td>
              </tr>`
              slNo++;

            });
            $('#catImage').val('');
            $('#categoryList').html(selectData);
            $('#categoryList').select2({tags: true,selectOnClose: true,width: "100%"});

                $('#tablecategory').DataTable().destroy();
                $('#tablecategory tbody').html(tableData);
            
                $("#tablecategory").DataTable({
                "responsive": true, "lengthChange": false, "autoWidth": false,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tablecategory_wrapper .col-md-6:eq(0)');
            
                $('#tablecategory').DataTable().draw();
              

                
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
    $(document).on("click",".btn-danger",function(){
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
    $(document).on("click",".btn-primary",function(){
        
                // var btnId=$(this).attr("id");
                // var editId=btnId.substring(4,btnId.length-1)
        // pId=$(this).parent().siblings()[1].innerText;
        // ptext=$(this).parent().siblings()[2].innerText;
        // pImg=$(this).parent().siblings()[4].getElementsByTagName('img')[0].getAttribute('src');
        var btnId=$(this).attr("id");
        var editBtnId=btnId.substring(4,btnId.length-1)
        $.ajax({
            url:"/admin/category/edit",
            type:"POST",
            // dataType : "json",
            data:JSON.stringify({editBtnId}),
            // contentType:false,
            contentType: "application/json; charset=utf-8",
            cache:false,
            processData: false,
            success:function(data){

                if(data){

                    $('#categoryIdField').val(data.data[0].id);
                    $("#categoryList").val(data.data[0].id).change();
                    $('#CatImgPreview').attr('src','/adminImg/' + data.data[0].img);

                    // alert("Data Updated Successfully")
                }else if (data['data']=='failed'){
                    alert ("Failed while fetching datat");
                }else if (data['data']=='unauthorized user') {
                    window.location.replace("/admin/login");}
                else{
                    alert("Failed while updating")
                };
            }
        })

        // $('#categoryIdField').val(pId);
        // $("#categoryList").val(pId).change();
        // $('#CatImgPreview').attr('src',pImg);
        // $('#updateCatImgPreview').attr('src',pImg).css({'width':'200px','height':'150px','display':'block','cursor':'pointer'});
    })



// Update ajax requests
    $(document).on("click","#btnEditCategory",function(){
        var textValue=$("#categoryList :selected").text();
        var id=$("#categoryIdField").val();
        var updatedCatImg=$("#categoryImgField").val();

        if(textValue=='' || id=='' || updatedCatImg==''){
        alert("Kindly update all the fields!");
        return;
        };

        var dataToSend=new FormData();
        dataToSend.append('imageToUpload',document.getElementById('categoryImgField').files[0]);
        dataToSend.append('textValue',textValue);
        dataToSend.append('id',id);

        if (confirm("Are you sure to Update?")){
            $.ajax({
                url:"/admin/category/update",
                type:"POST",
                data:dataToSend,
                contentType:false,
                cache:false,
                processData: false,
                success:function(data){

                    if(data['data']=='success'){
                        $(".custom-file-label").text('Choose image for category');
                        $("#categoryList").val(0);
                        $("#CatImgPreview").attr('src',"/adminImg/views/admin/img/addCategory.png");
                        $("#categoryIdField").val();
                        loadCategoryData()
                        alert("Data Updated Successfully")
                    }else if (data['data']=='failed'){
                        alert ("Failed while updating or already exist!");
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
    $(document).on("click",".Activate",function(){

    var status=0;
    status=$(this).hasClass('btn-secondary')?0:1

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
        const catImg=$("#categoryImgField").val();  

        if (categoryValue =='' || categoryValue=='Add Category' || catImg==''){
            alert("Kindly enter category name and image");
            return;
        };

        var dataToSend=new FormData();
        dataToSend.append('imageToUpload',document.getElementById('categoryImgField').files[0]);
        dataToSend.append('categoryValue',categoryValue)

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
                    // $("#categoryImgField").val('');
                    $(".custom-file-label").text('Choose image for category');
                    $("#categoryList").val(0);
                    $("#CatImgPreview").attr('src',"/adminImg/views/admin/img/addCategory.png");
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

        return;
        pImg=$("#categoryImgField").val();
        alert(pImg);
        $('#CatImgPreview').attr('src',pImg);
    // });
    
};

// function to show image in image preview
$('#categoryImgField').change( function(event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
        $("#CatImgPreview").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
        // $("#CatImgPreview").html("Temporary Path(Copy it and try pasting it in browser address bar) --> <strong>["+tmppath+"]</strong>");
});