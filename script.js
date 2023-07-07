// Author - Kelvin Lu
// *SURVEY COOKIE FUNCTIONS
function survey_cookie_handler(){
    // Grab today's date.
    var now = new Date();
    var hour = now.getHours();
    var name;

    // Start of writing greeting.
    document.write("<h3> ")

    // Distinguish time of day.
    if (hour < 12)
        document.write("Good Morning ")
    else {
        hour -= 12

        if (hour < 6) {
            document.write("Good Afternoon ");
        }
        else
            document.write("Good Evening ");
    }

    // Find the name from cookie.
    if (document.cookie) { // if cookie exists

        // Convert escapd characters to English notation
        var myCookie = unescape(document.cookie);

        // Split the token and grab the name from cookie.
        var cookieTokens = myCookie.split("=");

        name = cookieTokens[1];

    } else { // Cookie doesn't exists
        name = window.prompt("Please enter your name");

        document.cookie = "name=" + escape(name);

    }

    document.writeln(name + ", welcome to SWE642 survey. </h3>");

    // Wrong ID/cookie script.
    document.writeln("<a href='javascript:wrongCookieID()'>" + "Click here to change user. Current User:" + name + "<\a>");

}

function wrongCookieID() {
    // Erase cookie
    document.cookie = "name=null;" + " expires=Thu, 01-Jan-95 00:00:01 GMT";

    // Reload page.
    location.reload();
}

// *RAFFLE FUNCTIONS
/**
        * Raffle Handler when the input is changed.
        */
function raffle_handler() {
    var html_obj = document.getElementById("raffle_num");

    var num_array = process_raffle_input(html_obj);

    // Error encountered.
    if (typeof num_array === "string") {
        alert(num_array);
        return;
    }

    // Process num_array and display it into HTML output.
    generate_raffle_output(num_array);

}

/**
 * Process raffle object and return the int array (int []).
 * Returns:
 *    - string if Error recieved, return error message.
 *    - int[] - If operation is sucessful.
 */
function process_raffle_input(html_obj) {

    input_string = html_obj.value;
    var num_tokens = input_string.split(",");

    // Validate token size.
    var error_msg = "";

    if (num_tokens.length < 10) {
        // alert("Invalid raffle input length.");
        error_msg = "Invalid raffle input length."
        return error_msg;
    }

    var output_array = []
    // Process string to array of ints.
    for (var i = 0; i < num_tokens.length; i++) {
        output_array[i] = parseInt(num_tokens[i]);

        // Exception handling - Validate text input.
        if (output_array[i] == NaN) {
            error_msg = "One of the raffle input is not a number."


            return error_msg;
        }

        if (output_array[i] < 1 || output_array[i] > 100) {
            error_msg = "Output " + output_array[i] + " is not within the range [0,100]";
            // html_object.value = "";
            return error_msg;
        }

    }

    return output_array;

}

/**
 * Process the HTML output for the Raffle. Currently supports average and max. 
 */
function generate_raffle_output(num_array) {
    // Calculate the max and average number.
    var max_num = Math.max.apply(null, num_array);

    // Sum
    const f_array_avg = array => array.reduce((a, b) => a + b) / array.length;

    var avg_num = f_array_avg(num_array);

    // HTML OUTPUT.
    // Reassign average label.
    document.getElementById('avg_output_lbl').innerHTML = "Raffle Average Number: " + avg_num;

    // Reassign max label.
    document.getElementById('max_output_lbl').innerHTML = " Raffle Max Number: " + max_num;


}

// SURVEY VALIDATION FUNCTIONS 
function submit_form_handler() {

    validate_form();

}

/**
 * Validate certain fields from the form.
 */
function validate_form() {

    validate_name_field();
    validate_grad_year();
    validate_address();
    validate_email_field();
    validate_likes_field();


}

function validate_name_field() {

    // if first name doesn't have letters only.
    first_name_str = document.getElementById("first_name_input").value;
    if (!/^[a-zA-Z]+$/.test(first_name_str)) {

        alert("First name can only contain alphanumeric values.");

        // Clear first name input field.
        document.getElementById("first_name_input").value = "";

    }

    // If last name doesn't have letters only.
    last_name_str = document.getElementById("last_name_input").value;
    if (!/^[a-zA-Z]+$/.test(last_name_str)) {
        alert("Last name can only contain alphanumeric values.");

        // Clear last name input field.
        document.getElementById("last_name_input").value = "";
    }

    return;
}


function validate_email_field() {

    email_address_str = document.getElementById("email_input");
    email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email_address_str.value.match(email_regex)) {

        alert("Email address is not in the right format.");

        document.getElementById("email_input").value = "";

    }

    return;
}

function validate_grad_year() {

    grad_year_str = document.getElementById("grad_year_input").value

    if (!/^[0-9]{4}$/.test(grad_year_str)) {
        alert("Invalid graduation year.");

        document.getElementById("grad_year_input").value = "";
    }

}

function validate_likes_field() {

    // ASSUMPTION - At least 2 checkbox are checked.

    var count = 0;


    input_checkboxes = document.getElementsByName("likes");
    for (var i = 0; i < input_checkboxes.length; i++) {
        if (input_checkboxes[i].checked == true) {
            count++;
        }
    }

    if (count < 2) {
        alert("Two checkboxes must be checked.");
    }

}


function validate_address() {

    // Validate street address.
    street_address_str = document.getElementById("street_address_input").value;
    if (!/^[A-Za-z0-9 ]*$/.test(street_address_str)) {
        alert("Street address can only contain alphanumeric values.");

        // Clear first name input field.
        document.getElementById("street_address_input").value = "";

    }

    // Validate city input.
    city_str = document.getElementById("city_input").value;
    if (!/^[A-Za-z]*$/.test(city_str)) {
        alert("City can only contain alphabetical values.");

        // Clear first name input field.
        document.getElementById("city_input").value = "";

    }

    // Validate state.
    state_str = document.getElementById("state_input").value;
    if (!/^[A-Za-z]*$/.test(state_str)) {
        alert("State can only contain alphabetical values.");

        // Clear first name input field.
        document.getElementById("state_input").value = "";

    }

    // Validate Zip code.
    zip_str = document.getElementById("zip_input").value;
    if (!/^[0-9]*$/.test(zip_str)) {
        alert("Zip can only contain numerical values.");

        // Clear first name input field.
        document.getElementById("zip_input").value = "";

    }


}

// *ZIP CODE VALIDATE ZIP FUNCTIONS 
function validateZip(zip) {
    try {
        var asyncRequest = new XMLHttpRequest();
        asyncRequest.onreadystatechange = function () {
            call_back_handler(zip, asyncRequest)
        }; // end anonymous function
        asyncRequest.open("GET", "/data/zip_codes.json", true);
        asyncRequest.withCredentials = true;
        asyncRequest.send();
    } catch (exception) {
        alert(exception);
        alert("Request failed.");
    }
}

function call_back_handler(zip, asyncRequest){
    try{
        callBack(zip, asyncRequest);

    }catch(exception){
        alert(exception);
    }
   
    
}

function callBack(zip, asyncRequest) {

    // Update that async call is processing.
    document.getElementById("validate_zip_lbl").innerHTML = "Checking zip...";
    document.getElementById("city_input").innerHTML = "";
    document.getElementById("state_input").innerHTML = "";

    // if sucessful request, process response
    if (asyncRequest.readyState == 4) {
        if (asyncRequest.status == 200) {
            var data = JSON.parse(asyncRequest.responseText);
            // Search inside JSON.
            result = check_valid_zip_json(zip, data);

            // if Zip code found.
            if (result.valid) {
                document.getElementById("city_input").value = result.city;
                document.getElementById("state_input").value = result.state;
                document.getElementById("validate_zip_lbl").innerHTML = "Zip found.";
            } else { // Zip code not found.
                document.getElementById("validate_zip_lbl").innerHTML = "Zip not found.";
            }
        }
    }
}

/**
 * Search if zip code is in json.
 * If true, return true, city, and state.
 */
function check_valid_zip_json(zip, data_file) {
    var zipcodes = data_file.zipcodes;
    for (var element of zipcodes) {
        if (element.zip === zip) {

            return {
                valid: true,
                city: element.city,
                state: element.state
            };
        }
    }
    return {
        valid: false
    };
}