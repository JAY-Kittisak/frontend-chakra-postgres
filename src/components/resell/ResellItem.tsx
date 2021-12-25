import React, { useState } from "react";
import { Tr, Td, Text, Button, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router";

import { RegularResellFragment } from "../../generated/graphql";
import CustomerDetail from "./CustomerDetail";
import { formatDate } from "../../utils/helpers";

interface Props {
    resell: RegularResellFragment;
}

const ResellItem: React.FC<Props> = ({ resell }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [customerId, setCustomerId] = useState(0);

    const history = useHistory();

    const transformDate = formatDate(+resell.createdAt);
    const getDateEnd = new Date("5/12/2022");
    const getDateStart = new Date();
    const differenceInTime = getDateEnd.getTime() - getDateStart.getTime();

    const sumDateAll = differenceInTime / (1000 * 3600 * 24);
    const sumYear = sumDateAll / 365;

    const dateDifference = new Date(differenceInTime);

    const dayDiff = dateDifference.getUTCDate() - 1;
    const monthDiff = dateDifference.getUTCMonth();

    return (
        <>
            <Tr _hover={{ bgColor: "#eee" }}>
                <Td w="20%">
                  <Text
                      fontWeight="bold"
                      color={resell.maker === "YAMAWA" ? "blue.600" : "red"}
                  >
                      {resell.maker}
                  </Text>
                  <Text>{resell.category}</Text>
                  <Text>วันที่ลงทะเบียน : {transformDate}</Text>
                  <Text>กำหนดอายุถึง : {formatDate(+getDateEnd)}</Text>

                  {sumDateAll <= 0 ? (
                      <Text fontWeight="bold" as="u" color="red">
                          Register นี้หมดอายุแล้ว
                      </Text>
                  ) : (
                      <Text color="green">
                                เหลือกเวลาอยู่ : {sumYear >= 1 && sumYear.toString().split(".")[0] + " ปี"}{" "}
                          {monthDiff >= 1 && monthDiff + " เดือน"} {dayDiff} วัน
                      </Text>
                  )}
              </Td>
              <Td w="15%">
                  <Text>{resell.title}</Text>
              </Td>
              <Td w="25%">
                  <p>{resell.detail}</p>
                  <Flex justify="end">
                      <Button
                          colorScheme="green"
                          size="xs"
                          variant="outline"
                          onClick={() => history.push(`/resell/step2/${resell.id}`)}
                      >
                          รายละเอียดเพิ่มเติม...
                      </Button>
                  </Flex>
              </Td>
              <Td w="20%">
                  <Text
                      _hover={{ fontWeight: "bold" }}
                      cursor="pointer"
                      onClick={() => {
                          setCustomerId(resell.orderCustomer.id);
                          setIsOpen(true);
                      }}
                  >
                      {resell.orderCustomer.customerName}
                  </Text>
              </Td>
              <Td w="20%">
                  {resell.customers?.map((val) => (
                      <Text
                          _hover={{ fontWeight: "bold" }}
                          key={val.id}
                          cursor="pointer"
                          onClick={() => {
                      setCustomerId(val.id);
                      setIsOpen(true);
                  }}
              >
                  {val.customerName}
              </Text>
          ))}
              </Td>
          </Tr>
          <CustomerDetail
              customerId={customerId}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
          />
      </>
    );
};

export default ResellItem;
