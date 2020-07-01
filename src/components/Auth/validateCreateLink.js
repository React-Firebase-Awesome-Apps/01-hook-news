export default function validateCreateLink(values) {
    let errors = {}

    // Description errors
    if (!values.description) {
        errors.description = 'Description required'
    } else if (values.description.length < 10) {
        errors.description = 'Description must be at least 10 characters'
    }

    //Url errors
    if (!values.url) {
        errors.url = 'Url required'
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'URL is not valid.'
    }

    return errors;
}
