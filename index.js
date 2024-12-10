$("#empId").focus();

function validateAndGetFormData() {
   
    var stuRoll = $("#stuRoll").val();
    if (stuRoll === "") {
        alert("Student Roll Number Required Value");
        $("#stuRoll").focus();
        return "";
    }

    var stuName = $("#stuName").val();
    if (stuName === "") {
        alert("Student Name is Required Value");
        $("#stuName").focus();
        return "";
    }

    var stuClass = $("#stuClass").val();
    if (stuClass === "") {
        alert("Class is Required Value");
        $("#stuClass").focus();
        return "";
    }

    var stuBirth = $("#stuBirth").val();
    if (stuBirth === "") {
        alert("DOB is Required Value");
        $("#stuBirth").focus();
        return "";
    }


    var stuAd = $("#stuAd").val();
    if (stuAd === "") {
        alert("Employee Da is Required Value");
        $("#stuAd").focus();
        return "";
    }


    var stuJDate = $("#stuJDate").val();
    if (stuJDate === "") {
        alert("Employee Deduction is Required Value");
        $("#stuJDate").focus();
        return "";
    }

    

    var jsonStrObj = {
        roll: stuRoll,
        name: stuName,
        class: stuClass,
        dob:stuBirth,
        add:stuAd,
        jdate:stuJDate
    };

    return JSON.stringify(jsonStrObj);
}


function saveData() {
    var jsonStr = validateAndGetFormData();

    var putReqStr = createPUTRequest("90934397|-31949227088468081|90957211",
    jsonStr, "SCHOOL-DB", "STUDENT-TABLE");
    
    jQuery.ajaxSetup({async: false});
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
    "http://api.login2explore.com:5577", "/api/iml");
    
    jQuery.ajaxSetup({async: true});
    
    alert("Data Saved Successfully");
    resetForm();
    $("#empId").focus();
}

function resetForm() {
    $("#stuRoll").val("")
    $("#stuName").val("");
    $("#stuClass").val("");
    $("#stuBirth").val("");
    $("#stuAd").val("");
    $("#stuJDate").val("");

    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    
    $("#empId").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonchng = validateAndGetFormData();
    var updateRequest = createUPDATERecordRequest("90934397|-31949227088468081|90957211",
        jsonchng,"SCHOOL-DB", "STUDENT-TABLE",
    localStorage.getItem("recno"));
    

    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest,
    "http://api.login2explore.com:5577", "/api/iml");
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});
    // console.log(resJsonObj); 
    alert("Data Updated Successfully");   
    resetForm();
    $("#empId").focus();
}

function getStu(){
    var empIdJsonObj = getIdAsJson();
    var getRequest = createGET_BY_KEYRequest("90934397|-31949227088468081|90957211",
        "SCHOOL-DB", "STUDENT-TABLE",empIdJsonObj);

    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,
    "http://api.login2explore.com:5577", "/api/irl");
    // alert(JSON.stringify(resultObj));
    jQuery.ajaxSetup({async: true});

     // Check if Roll Number is not empty
     if ($("#stuRoll").val() !== "") {
        // Enable Save and Reset Buttons
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        
    }
    

    // No data found with the existing Rollno
    if(resJsonObj===400){
        $("#change").prop("disabled",true);
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#stuName").focus();
    }else if(resJsonObj===200){
        
        $("#stuRoll").prop("disabled",true);  
        $("#save").prop("disabled",true);
        fillData(resJsonObj);

        $("#change").prop("disabled",false);    
        $("#reset").prop("disabled",false);
        $("#stuName").focus();
    }
}

function getIdAsJson(){
    var stuRoll = $("#stuRoll").val();
    var jsonStr = {
                    roll:stuRoll,
                  };
    return JSON.stringify(jsonStr);
}

function fillData(jsonobj){
    saveLocally(jsonobj);
    var record = JSON.parse(jsonobj.data).record;

    $("#stuName").val(record.name);
    $("#stuClass").val(record.class);
    $("#stuBirth").val(record.dob);
    $("#stuAd").val(record.add);
    $("#stuJDate").val(record.jdate);
}

function saveLocally(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}
