import { ApiError } from "./api-error.js"

export const uploadImage = (file) => {

    if(!file) {
        throw new ApiError(
            400,
            "Image file is required"
        )
    }

    return {
        url : `/images/${file.filename}`,
        localpath: file.path
    }
}

