import { useState } from "react";
import { storageRef } from "./config";
import { v4 as uuidv4 } from "uuid";

const createImageRef = (imageName: string) => {
    const uuid = uuidv4();

    return storageRef.child(`user/${imageName}-${uuid}`);
};

export const useAddUserImage = () => {
    const [uploadProgression, setUploadProgression] = useState(0);
    const [addProductFinished, setAddProductFinished] = useState(false)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const uploadImageToStorage = (image: File, cd: (imageUrl: string) => void) => {
        setLoading(true);

        // 1. Upload รูปไปที่ firebase storage, get back an image url
        const imageRef = createImageRef(image.name);
        const uploadTask = imageRef.put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // คำนวนเปอร์เซ็นต์ upload
                const progression =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setUploadProgression(progression);
            },
            (err) => {
                // Error case
                setError(err.message);
                setLoading(false);
            },
            () => {
                // Success case
                setUploadProgression(0);

                // Get the image url
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then((imageUrl) => {
                        // 2.
                        cd(imageUrl)
                    })
                    .catch((err) => {
                        const { message } = err as { message: string }

                        setError(message)
                        setLoading(false)
                    })
            }
        );

    };
    const updateImageUser = (data: { id: number }) => (imageUrl: string) => {
        const { id } = data
        setLoading(true)
        setAddProductFinished(false)
        const newImageUser = {
            imageUrl
        }
        return newImageUser
    }

    return { uploadImageToStorage, updateImageUser, uploadProgression, addProductFinished, loading, error }
};
