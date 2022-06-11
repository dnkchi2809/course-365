
//region 1
var gCoursesDB = {
    description: "This DB includes all courses in system",
    courses: [
        {
            id: 1,
            courseCode: "FE_WEB_ANGULAR_101",
            courseName: "How to easily edit a website with Angular",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-angular.jpg",
            teacherName: "Morris Mccoy",
            teacherPhoto: "images/teacher/morris_mccoy.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 2,
            courseCode: "BE_WEB_PYTHON_301",
            courseName: "The Python Course: build web application",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-python.jpg",
            teacherName: "Claire Robertson",
            teacherPhoto: "images/teacher/claire_robertson.jpg",
            isPopular: false,
            isTrending: true
        },
        {
            id: 5,
            courseCode: "FE_WEB_GRAPHQL_104",
            courseName: "GraphQL: introduction to graphQL for beginners",
            price: 850,
            discountPrice: 650,
            duration: "2h 15m",
            level: "Intermediate",
            coverImage: "images/courses/course-graphql.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 6,
            courseCode: "FE_WEB_JS_210",
            courseName: "Getting Started with JavaScript",
            price: 550,
            discountPrice: 300,
            duration: "3h 34m",
            level: "Beginner",
            coverImage: "images/courses/course-javascript.jpg",
            teacherName: "Ted Hawkins",
            teacherPhoto: "images/teacher/ted_hawkins.jpg",
            isPopular: true,
            isTrending: false
        },
        {
            id: 8,
            courseCode: "FE_WEB_CSS_111",
            courseName: "CSS: ultimate CSS course from beginner to advanced",
            price: 750,
            discountPrice: 600,
            duration: "3h 56m",
            level: "Beginner",
            coverImage: "images/courses/course-css.jpg",
            teacherName: "Juanita Bell",
            teacherPhoto: "images/teacher/juanita_bell.jpg",
            isPopular: true,
            isTrending: true
        },
        {
            id: 14,
            courseCode: "FE_WEB_WORDPRESS_111",
            courseName: "Complete Wordpress themes & plugins",
            price: 1050,
            discountPrice: 900,
            duration: "4h 30m",
            level: "Advanced",
            coverImage: "images/courses/course-wordpress.jpg",
            teacherName: "Clevaio Simon",
            teacherPhoto: "images/teacher/clevaio_simon.jpg",
            isPopular: true,
            isTrending: false
        }
    ]
}

const gCOURSE_COLUMNS = ["coverImage", "courseName", "duration", "level", "teacherName", "price", "discountPrice", "action"];
const gCOVER_IMAGE_COL = 0;
const gCOURSE_NAME_COL = 1;
const gDURATION_COL = 2;
const gLEVEL_COL = 3;
const gTEACHER_NAME_COL = 4;
const gPRICE_COL = 5;
const gDISCOUNT_PRICE_COL = 6;
const gACTION_COL = 7;

var gCourse = {
    id: 0,
    courseCode: "",
    courseName: "",
    price: -1,
    discountPrice: -1,
    duration: "",
    level: "",
    coverImage: "",
    teacherName: "",
    teacherPhoto: "",
    isPopular: false,
    isTrending: false
}

var gCoverImageTmpPath = "";
var gTeacherPhotoTmpPath = "";
var gCourseID = ""

//region 2: vùng sự kiện các btn
$(document).on("click", "#add-btn", function () {
    onBtnAddClick();
})

$(document).on("click", "#btn-confirm-create-course", function () {
    onBtnConfirmAddClick();
})

$(document).on("click", ".edit-i", function () {
    onBtnEditClick(this);
})

$(document).on("click", "#btn-confirm-edit-course", function () {
    onBtnConfirmEditClick();
})

$(document).on("click", ".delete-i", function () {
    onBtnDeleteClick(this);
})

$(document).on("click", "#btn-confirm-delete-course", function () {
    onBtnConfirmDeleteClick(gCourseID);
})

$(document).on("mouseenter", "#i-add-btn", function () {
    $("#i-add-btn").removeClass("text-primary");
    $("#i-add-btn").addClass("text-warning");
})

$(document).on("mouseleave", "#i-add-btn", function () {
    $("#i-add-btn").removeClass("text-warning");
    $("#i-add-btn").addClass("text-primary");
})

$(document).on("change", "#inp-create-coursecode", function () {
    validateCourseCode($(this).val(), gCoursesDB.courses);
})

$(document).on("change", '#inp-create-coverimage', function (event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    //$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    gCoverImageTmpPath = tmppath;
});

$(document).on("change", '#inp-create-teacherphoto', function (event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    //$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    gTeacherPhotoTmpPath = tmppath;
});

$(document).on("change", '#inp-edit-coverimage', function (event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    //$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    gCoverImageTmpPath = tmppath;
});

$(document).on("change", '#inp-edit-teacherphoto', function (event) {
    var tmppath = URL.createObjectURL(event.target.files[0]);
    //$("img").fadeIn("fast").attr('src',URL.createObjectURL(event.target.files[0]));
    gTeacherPhotoTmpPath = tmppath;
});

//region 3
function onPageIndexLoad() {
    console.log("Page Loaded!")
    loadPopularCourse();
    loadTrendingCourse();

    //region 1
}

function onPageCourseLoad() {
    console.log(gCoursesDB.courses)
    //hiển thị danh sách khóa học
    loadCourseList(gCoursesDB.courses);
}


function loadPopularCourse() {
    $("#popular-div").show();
    //b1: lấy 4 course popular
    var vCourse = getPopularCourse();
    console.log(vCourse);
    //b2: validate

    //b3: hiển thị
    displayCoursePopular(vCourse);
}

function loadTrendingCourse() {
    $("#trending-div").show();
    //b1: lấy 4 course trending
    var vCourse = getTrendingCourse();
    console.log(vCourse);
    //b2: validate

    //b3: hiển thị
    displayCourseTrending(vCourse);
}

function loadCourseList(paramData) {
    console.log("load course list");
    var gCourseTable = $("#course-table").DataTable({
        ordering: false,
        destroy: true,
        columns: [
            { data: gCOURSE_COLUMNS[gCOVER_IMAGE_COL] },
            { data: gCOURSE_COLUMNS[gCOURSE_NAME_COL] },
            { data: gCOURSE_COLUMNS[gDURATION_COL] },
            { data: gCOURSE_COLUMNS[gLEVEL_COL] },
            { data: gCOURSE_COLUMNS[gTEACHER_NAME_COL] },
            { data: gCOURSE_COLUMNS[gPRICE_COL] },
            { data: gCOURSE_COLUMNS[gDISCOUNT_PRICE_COL] },
            { data: gCOURSE_COLUMNS[gACTION_COL] },
        ],
        columnDefs: [
            {
                targets: gCOVER_IMAGE_COL,
                "render": function (data) {
                    return '<img src="' + data + '" alt="' + data + '"height="100" width="150"/>';
                }
            },
            {
                targets: gCOURSE_NAME_COL,
                width: "30%",
                render: function (data) {
                    return '<p class="h6 text-primary">' + data + '</p>'
                }

            },
            {
                targets: gDURATION_COL,
                className: "text-center",
                width: "5%"

            },
            {
                targets: gLEVEL_COL,
                className: "text-center",
                width: "5%"
            },
            {
                targets: gTEACHER_NAME_COL,
                className: "text-center",
                width: "15%",
            },
            {
                targets: gPRICE_COL,
                className: "text-center",
                width: "5%",
                render: function (data) {
                    return `<p style = "text-decoration-line: line-through">` + data + `</p>`
                }
            },
            {
                targets: gDISCOUNT_PRICE_COL,
                className: "text-center",
                width: "10%",
                render: function (data) {
                    return `<p class="h6 text-primary">` + data + `</p>`
                }
            },
            {
                targets: gACTION_COL,
                width: "10%",
                className: "text-center",
                defaultContent: `
                    <i class="fas fa-edit fa-lg pointer edit-i data-toggle="tooltip" title="Edit""></i>
                    <i class="pl-2 fas fa-trash fa-lg pointer delete-i data-toggle="tooltip" title="Delete""></i>
                `
            }
        ]
    });
    gCourseTable.clear();
    gCourseTable.rows.add(paramData);
    gCourseTable.draw();
}

function onBtnAddClick() {
    $("#create-course-modal").modal("show");
}

function onBtnConfirmAddClick() {
    //b1: get thông tin input
    getDataNewCourse(gCourse);
    console.log(gCourse);

    //b2: validate
    var vCourseValid = validateCourse(gCourse, gCoursesDB.courses);

    //b3: display
    if (vCourseValid) {
        gCoursesDB.courses.push(gCourse);
        alert("Add course success");
        console.log("Reload Course List");
        console.log(gCoursesDB.courses);
        loadCourseList(gCoursesDB.courses);
        $("#create-course-modal").modal("hide");
        blankModalCreate();
    }
}


function onBtnEditClick(paramElement) {
    console.log("Edit");
    $("#edit-course-modal").modal("show");
    displayDataToInput(paramElement);

}

function onBtnConfirmEditClick() {
    //b1: get thông tin input
    getDataEditCourse(gCourse);
    console.log(gCourse);

    //b2: validate
    var vValidEditData = updateEditData(gCourse, gCoursesDB.courses);
    //b3: display
    if(vValidEditData){
        alert("Edit success");
        console.log("Reload Course List");
        console.log(gCoursesDB.courses);
        loadCourseList(gCoursesDB.courses);
        $("#edit-course-modal").modal("hide");
        blankModalEdit();
    }
}

function onBtnDeleteClick(paramElement) {
    console.log("Delete");
    $("#delete-course-modal").modal("show");
    gCourseID = getDataDelete(paramElement);
}

function onBtnConfirmDeleteClick(paramID){
    deleteCourseByID(paramID, gCoursesDB.courses);
    console.log(gCoursesDB.courses);
    loadCourseList(gCoursesDB.courses);
    $("#delete-course-modal").modal("hide");
}

//region 4
//lấy 4 khóa popular
function getPopularCourse() {
    var vCourse = [];
    for (var bI = 0; bI < gCoursesDB.courses.length; bI++) {
        if (gCoursesDB.courses[bI].isPopular == true && vCourse.length <= 4) {
            vCourse.push(gCoursesDB.courses[bI]);
        }
    }
    return vCourse;
}

//lấy 4 khóa trending
function getTrendingCourse() {
    var vCourse = [];
    for (var bI = 0; bI < gCoursesDB.courses.length; bI++) {
        if (gCoursesDB.courses[bI].isTrending == true && vCourse.length <= 4) {
            vCourse.push(gCoursesDB.courses[bI]);
        }
    }
    return vCourse;
}

//hiển thị khóa popular
function displayCoursePopular(paramCourse) {
    for (var bI = 0; bI < paramCourse.length; bI++) {
        $(`#card-popular-` + (bI + 1) + ``).show();
        $(`#img-cover-popular-` + (bI + 1) + ``).prop("src", paramCourse[bI].coverImage);
        $(`#coursename-popular-` + (bI + 1) + ``).html(paramCourse[bI].courseName);
        $(`#duration-popular-` + (bI + 1) + ``).html(paramCourse[bI].duration);
        $(`#level-popular-` + (bI + 1) + ``).html(paramCourse[bI].level);
        $(`#price-popular-` + (bI + 1) + ``).html("$" + paramCourse[bI].price);
        $(`#discountprice-popular-` + (bI + 1) + ``).html("$" + paramCourse[bI].discountPrice);
        $(`#teacherphoto-popular-` + (bI + 1) + ``).css("background-image", 'url("' + paramCourse[bI].teacherPhoto + '")');
        $(`#teachername-popular-` + (bI + 1) + ``).html(paramCourse[bI].teacherName);
    }
}


//hiển thị khóa trending
function displayCourseTrending(paramCourse) {
    for (var bI = 0; bI < paramCourse.length; bI++) {
        $(`#card-treding-` + (bI + 1) + ``).show();
        $(`#img-cover-trending-` + (bI + 1) + ``).prop("src", paramCourse[bI].coverImage);
        $(`#coursename-trending-` + (bI + 1) + ``).html(paramCourse[bI].courseName);
        $(`#duration-trending-` + (bI + 1) + ``).html(paramCourse[bI].duration);
        $(`#level-trending-` + (bI + 1) + ``).html(paramCourse[bI].level);
        $(`#price-trending-` + (bI + 1) + ``).html("$" + paramCourse[bI].price);
        $(`#discountprice-trending-` + (bI + 1) + ``).html("$" + paramCourse[bI].discountPrice);
        $(`#teacherphoto-trending-` + (bI + 1) + ``).css("background-image", 'url("' + paramCourse[bI].teacherPhoto + '")');
        $(`#teachername-trending-` + (bI + 1) + ``).html(paramCourse[bI].teacherName);
    }
}

//lấy thông tin từ modal create course
function getDataNewCourse(paramCourseInput) {
    paramCourseInput.id = createNewCourseId(gCoursesDB.courses);
    paramCourseInput.courseCode = $("#inp-create-coursecode").val();
    paramCourseInput.courseName = $("#inp-create-coursename").val();
    paramCourseInput.price = $("#inp-create-price").val();
    paramCourseInput.discountPrice = $("#inp-create-discountprice").val();
    paramCourseInput.duration = $("#inp-create-duration").val();
    paramCourseInput.level = $("input[name=create-level-check]:checked").val();
    paramCourseInput.coverImage = gCoverImageTmpPath;
    paramCourseInput.teacherName = $("#inp-create-teachername").val();
    paramCourseInput.teacherPhoto = gTeacherPhotoTmpPath;
    paramCourseInput.isPopular = $("input[name=create-popular-check]:checked").val();
    paramCourseInput.isTrending = $("input[name=create-trending-check]:checked").val();
}

//lấy thông tin từ modal edit course
function getDataEditCourse(paramCourseInput) {
    paramCourseInput.id = $("#inp-edit-id").val();
    paramCourseInput.courseCode = $("#inp-edit-coursecode").val();
    paramCourseInput.courseName = $("#inp-edit-coursename").val();
    paramCourseInput.price = $("#inp-edit-price").val();
    paramCourseInput.discountPrice = $("#inp-edit-discountprice").val();
    paramCourseInput.duration = $("#inp-edit-duration").val();
    paramCourseInput.level = $("input[name=edit-level-check]:checked").val();
    paramCourseInput.coverImage = gCoverImageTmpPath;
    paramCourseInput.teacherName = $("#inp-edit-teachername").val();
    paramCourseInput.teacherPhoto = gTeacherPhotoTmpPath;
    paramCourseInput.isPopular = $("input[name=edit-popular-check]:checked").val();
    paramCourseInput.isTrending = $("input[name=edit-trending-check]:checked").val();
}

//tạo id autoincrement mới
function createNewCourseId(paramCourse) {
    var vNextId = 0;
    if (paramCourse.length == 0) {
        vNextId = 1;
    }
    else {
        vNextId = paramCourse[paramCourse.length - 1].id + 1;
    }
    return vNextId;
}

//validate not blanked
function validateCourse(paramCourseInput) {
    if (paramCourseInput.courseCode == "") {
        alert("Course Code cannot blanked");
        return false;
    }
    if (paramCourseInput.courseName == "") {
        alert("Course Name cannot blanked");
        return false;
    }
    if (paramCourseInput.price == "") {
        alert("Price cannot blanked");
        return false;
    }
    if (paramCourseInput.discountPrice > paramCourseInput.price) {
        alert("Discount price cannot higher than price");
        return false;
    }
    if (paramCourseInput.duration == "") {
        alert("Duration cannot blanked");
        return false;
    }
    if (paramCourseInput.level == "") {
        alert("Level cannot blanked");
        return false;
    }
    if (paramCourseInput.coverImage == "") {
        alert("Cover Image cannot blanked");
        return false;
    }
    if (paramCourseInput.teacherName == "") {
        alert("Teacher Name cannot blanked");
        return false;
    }
    if (paramCourseInput.teacherPhoto == "") {
        alert("Teacher photo cannot blanked");
        return false;
    }
    if (paramCourseInput.isPopular == "") {
        alert("Popular cannot blanked");
        return false;
    }
    if (paramCourseInput.isTrending == "") {
        alert("Trending cannot blanked");
        return false;
    }
    return true;
}


//validate course code unique
function validateCourseCode(paramInput, paramDB) {
    for (var vElement of paramDB) {
        if (paramInput == vElement.courseCode) {
            alert("Course Code must be unique");
            $("#inp-create-coursecode").focus();
        }
    }
}

function displayDataToInput(paramElement) {
    var vRow = $(paramElement).closest("tr");
    var vTable = $("#course-table").DataTable();
    var vRowData = vTable.row(vRow).data();
    console.log(vRowData);

    $("#inp-edit-id").val(vRowData.id);
    $("#inp-edit-coursecode").val(vRowData.courseCode);
    $("#inp-edit-coursename").val(vRowData.courseName);
    $("#inp-edit-price").val(vRowData.price);
    $("#inp-edit-discountprice").val(vRowData.discountPrice);
    $("#inp-edit-duration").val(vRowData.duration);
    $("input[name=edit-level-check]").each(function(){
        var vLevel = $(this).val();
        if(String(vLevel) == String(vRowData.level)){
            this.checked = true;
        }
    }); 
    $("#inp-edit-teachername").val(vRowData.teacherName);
    $("#inp-edit-teacherPhoto").val(vRow.teacherPhoto);
    $("input[name=edit-popular-check]").each(function(){
        var vPopular = $(this).val();
        if(String(vPopular) == String(vRowData.isPopular)){
            this.checked = true;
        }
    });
    $("input[name=edit-trending-check]").each(function(){
        var vTrending = $(this).val();
        if(String(vTrending) == String(vRowData.isTrending)){
            this.checked = true;
        }
    });
}

function updateEditData(paramDataEdit, paramDB) {
    for (var bElement of paramDB) {
        if (paramDataEdit.id == bElement.id) {
            for (var bKey in paramDataEdit) {
                if (paramDataEdit[bKey] !== "") {
                    if (paramDataEdit[bKey] !== undefined) {
                        if(String(paramDataEdit[bKey]) !== String(bElement[bKey])){
                            bElement[bKey] = paramDataEdit[bKey];
                            console.log("Update " + bKey);
                            return true;
                        }
                    }
                }
                else {
                    alert("Cannot replace " + bKey + " by blank");
                    return false;
                }
            }
        }
    }
}

function blankModalCreate() {
    $("#inp-create-id").val("");
    $("#inp-create-coursecode").val("");
    $("#inp-create-coursename").val("");
    $("#inp-create-price").val("");
    $("#inp-create-discountprice").val("");
    $("#inp-create-duration").val("");
    $("input[name=create-level-check]").prop('checked', false);;
    $("#inp-create-coverimage").val("");
    $("#inp-create-teachername").val("");
    $("#inp-create-teacherphoto").val("");
    $("input[name=create-popular-check]").prop('checked', false);;
    $("input[name=create-trending-check]").prop('checked', false);;
}

function blankModalEdit() {
    $("#inp-edit-id").val("");
    $("#inp-edit-coursecode").val("");
    $("#inp-edit-coursename").val("");
    $("#inp-edit-price").val("");
    $("#inp-edit-discountprice").val("");
    $("#inp-edit-duration").val("");
    $("input[name=edit-level-check]").prop('checked', false);
    $("#inp-edit-coverimage").val("");
    $("#inp-edit-teachername").val("");
    $("#inp-edit-teacherphoto").val("");
    $("input[name=edit-popular-check]").prop('checked', false);
    $("input[name=edit-trending-check]").prop('checked', false);
}

function getDataDelete(paramElement){
    var vRow = $(paramElement).closest("tr");
    var vTable = $("#course-table").DataTable();
    var vRowData = vTable.row(vRow).data();
    console.log(vRowData);
    return vRowData.id;
}

function deleteCourseByID(paramID, paramDB){
    for( var bElement of paramDB){
        if(bElement.id == paramID){
            var vPosition = paramDB.indexOf(bElement);
            paramDB.splice(vPosition,1);
        }
    }
}
