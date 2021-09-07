import React, { useState, useRef } from "react";
import {
    Box,
    Stack,
    Text,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    ModalCloseButton,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";

import InputField from "../../components/InputField";
import { SelectControl } from "../../components/Selectfield";
import { useCreateProductByTierMutation } from "../../generated/graphql";
import { catProduct } from "../../utils/helpers";
import JoinFactory from "./JoinFactory";

interface Props {
    creatorId: number;
    creatorName: string;
    Open: boolean;
    setOpen: () => void;
  // setOpenProductForm: (open: boolean) => void
}

const AddAndEditProductTier: React.FC<Props> = ({
    creatorId,
    creatorName,
    Open,
    setOpen,
}) => {
    const [{ data, fetching }, createProductByTier] =
        useCreateProductByTierMutation();
    const [showJoin, setShowJoin] = useState(false);
    const cancelRef = useRef();

    let body = null;

    // data is loading
    if (fetching) {
        // user not logged in
    } else if (!showJoin) {
        body = (
        // <Box>
        //     <Heading as="h3" size="lg" color="blue.400" mb="3">Add a new product</Heading>
        //     <Formik
        //         initialValues={{ creatorId, creatorName, productName: "", description: "", category: "" }}
        //         onSubmit={async (values) => {
        //             const { error } = await createProductByTier({ input: values })
        //             if (error) {
        //                 alert("แจ้ง IT support")
        //             } else {
        //                 setShowJoin(true)
        //             }
        //         }}
        //     >
        //         {({ isSubmitting }) => (
        //             <Form>
        //                 <InputField
        //                     name="productName"
        //                     placeholder="productName"
        //                     label="Product Name"
        //                 />

        //                 <Box mt={4}>
        //                     <InputField
        //                         textarea
        //                         name="description"
        //                         placeholder="description..."
        //                         label="Description"
        //                     />
        //                 </Box>

        //                 <Stack isInline justify="space-between" mt="5">
        //                     <Text fontWeight="semibold" fontSize="md" p={2}>
        //                         Category
        //                     </Text>
        //                     <SelectControl
        //                         name="category"
        //                         defaultValue=""
        //                     >
        //                         {catProduct.map((cat) => (
        //                             <option key={cat} value={cat}>
        //                                 {cat}
        //                             </option>
        //                         ))}
        //                     </SelectControl>
        //                 </Stack>

        //                 <Button
        //                     mt={10}
        //                     type="submit"
        //                     isLoading={isSubmitting}
        //                     bg="blue.400"
        //                 >
        //                     Add Product
        //                 </Button>
        //             </Form>
        //         )}
        //     </Formik>
        // </Box>
        <Formik
            initialValues={{
                creatorId,
                creatorName,
                productName: "",
                description: "",
                category: "",
            }}
            onSubmit={async (values) => {
            const { error } = await createProductByTier({ input: values });
            if (error) {
              alert("แจ้ง IT support");
          } else {
                    setShowJoin(true);
                }
            }}
        >
            {({ isSubmitting }) => (
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Add a new product
                        </AlertDialogHeader>
                        <ModalCloseButton />

                        <Form>
                            <AlertDialogBody>
                                <InputField
                                    name="productName"
                                    placeholder="productName"
                                    label="Product Name"
                                />

                                <Box mt={4}>
                                    <InputField
                                        textarea
                                        name="description"
                                        placeholder="description..."
                                        label="Description"
                                    />
                                </Box>

                                <Stack isInline justify="space-between" mt="5">
                                    <Text fontWeight="semibold" fontSize="md" p={2}>
                                        Category
                                    </Text>
                                    <SelectControl name="category" defaultValue="">
                                        {catProduct.map((cat) => (
                                            <option key={cat} value={cat}>
                                                {cat}
                                            </option>
                                        ))}
                                    </SelectControl>
                                </Stack>
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef.current} onClick={setOpen}>
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="blue"
                                    isLoading={isSubmitting}
                                    type="submit"
                                    ml={3}
                                >
                                    Add Product
                                </Button>
                            </AlertDialogFooter>
                        </Form>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            )}
        </Formik>
    );

      // user is logged in
  } else {
      data?.createProductByTier.id &&
          (body = (
              <JoinFactory
                  productId={data?.createProductByTier.id}
                  setOpenProductForm={setOpen}
              />
          ));
  }

    return (
        <>
          {/* <div
                className="backdrop"
                onClick={() => {
                    setOpenProductForm(false)
                }}
            >
                {' '}
            </div>
            <div className="modal--tier modal--add-product">
                <div
                    className="modal-close"
                    onClick={() => {
                        setOpenProductForm(false)
                    }}>
                    &times;
                </div> */}

          <AlertDialog
              isOpen={Open}
              leastDestructiveRef={cancelRef.current}
              onClose={setOpen}
          >
              {body}
          </AlertDialog>
          {/* </div> */}
      </>
    );
};

export default AddAndEditProductTier;
