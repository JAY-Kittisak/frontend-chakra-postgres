// import React, { useState, useRef, ChangeEvent } from 'react'
// import { useForm } from 'react-hook-form'

// import Input from '../Input'
// import Button from '../Button'
// import { useAddUserImage } from '../../firebase/useAddUserImage'
// import { User } from '../../generated/graphql'

// const fileType = ['image/png', 'image/jpeg', 'image/ipg']

// export type AddImageUrl = Pick<User, "imageUrl" | "id">

// interface Props {
//     userId: number
// }

// const AddImage: React.FC<Props> = ({ userId }) => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null)

//     const { uploadImageToStorage, updateImageUser, uploadProgression } = useAddUserImage()

//     const { register, handleSubmit, errors } = useForm<AddImageUrl>()

//     const inputRef = useRef<HTMLInputElement>(null)

//     const handleOpenUploadBox = () => {
//         if (inputRef?.current) inputRef.current.click()
//     }

//     const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
//         const files = e.target.files

//         if (!files || !files[0]) return

//         const file = files[0]

//         if (!fileType.includes(file.type)) {
//             alert('Wrong file format, allow only "png" or "jpeg" or "jpg"')
//             return
//         }

//         setSelectedFile(file)
//     }

//     const handleAddProduct = handleSubmit((data) => {
//         if (!selectedFile || !userId) return

//         return uploadImageToStorage(
//             selectedFile,
//             updateImageUser(data)
//         )
//     })

//     return (
//         <div>
//             <h2 className="header--center">Add Image</h2>

//             <form className="form" onSubmit={handleAddProduct}>

//                 {/* User ID */}
//                 <Input
//                     label="User id"
//                     type="number"
//                     name="userId"
//                     defaultValue={userId}
//                     error={errors.id?.message}
//                 />


//                 {/* Image */}
//                 <div className="form__input-container">
//                     <label htmlFor="Image" className="form__input-label">
//                         Image
//                     </label>

//                     <div className="form__input-file-upload">
//                         {uploadProgression ? (<div style={{ width: '70%' }}>
//                             <input
//                                 type="text"
//                                 className="upload-progression"
//                                 style={{
//                                     width: `${uploadProgression}%`,
//                                     color: 'white',
//                                     textAlign: 'center'
//                                 }}
//                                 value={`${uploadProgression}%`}
//                                 readOnly
//                             />
//                         </div>
//                         ) : (
//                             <input
//                                 type="text"
//                                 name='imageFileName'
//                                 className="input"
//                                 readOnly
//                                 style={{ width: '70%', cursor: 'pointer' }}
//                                 onClick={handleOpenUploadBox}
//                                 value={selectedFile ? selectedFile.name : ''}
//                                 ref={register({ required: 'Product image is required.' })}
//                             />
//                         )}


//                         <Button
//                             width="30%"
//                             height="100%"
//                             type="button"
//                             style={{ borderRadius: '0', border: '1px solid #282c3499' }}
//                             onClick={handleOpenUploadBox}
//                         >
//                             <span className="paragraph--small">Select image</span>
//                         </Button>

//                         <input
//                             type="file"
//                             ref={inputRef}
//                             style={{ display: 'none' }}
//                             onChange={handleSelectFile}
//                         />
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default AddImage

import React from 'react'

interface Props { }

const AddImage: React.FC<Props> = () => {
    return (
        <div>AddImage</div>
    )
}

export default AddImage