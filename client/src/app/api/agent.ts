import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:5000/api/';

const responseBody = (response: AxiosResponse) => response.data;

// This code appears to be checking for errors in some data object and handling them. 
//Let me break down what this code does step by step:

// if (data.errors) checks whether the data object has an errors property. 
//This is likely to determine if there are any errors to handle.

// Inside the if block, the code initializes an empty array named modelStateErrors to store error messages. 
//This array will be used to collect the error messages found in the data.errors object.

// The for...in loop iterates through each property (key) in the data.errors object.

// Inside the loop, if (data.errors[key]) checks if the value of the current property (error) is truthy. 
//This is done to ensure that only non-empty error messages are added to the modelStateErrors array.

// If the condition is met, the error message (value) is pushed to the modelStateErrors array using the push() method.

// After the loop completes, the throw statement is used to throw an exception. 
//The exception being thrown is the array modelStateErrors after flattening it. 
//Flattening the array means that if modelStateErrors contains nested arrays, 
//those nested arrays' contents are brought to the top level of the array.

// In essence, this code seems to be extracting error messages from the data.errors object 
//and throwing those messages as exceptions. It's using a loop to gather these messages and then 
//throwing them in a flattened array. However, there is one point to consider: the throw statement 
//typically expects a single value (an error object or message), not an array. If the intention is 
//to throw multiple errors, you might need to handle this in a different way, perhaps by throwing custom 
//error objects or by rethinking the error handling approach.

// Additionally, the context in which this code is used and the structure of the data.errors object would 
//impact the overall functionality and appropriateness of this code snippet.

axios.interceptors.response.use(response => {
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
         case 404:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;        
    }

    return Promise.reject(error.response);
})


const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url).then(responseBody),
    put: (url: string, body: {}) => axios.put(url).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}


const agent = {
    Catalog,
    TestErrors
}

export default agent;