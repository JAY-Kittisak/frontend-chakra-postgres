import React from 'react'
import { Droppable, Draggable } from "react-beautiful-dnd";
import { TypeDemoData } from "../../utils/helpers";

interface Props {
    customers: Array<TypeDemoData>
    setCustomers: React.Dispatch<React.SetStateAction<Array<TypeDemoData>>>;
    setCompletedCustomers: React.Dispatch<React.SetStateAction<Array<TypeDemoData>>>;
    CompletedCustomers: Array<TypeDemoData>;
    resellId: number | undefined
}

const CustomerList: React.FC<Props> = ({ resellId, customers, CompletedCustomers }) => {
    console.log(resellId)
    return (
        <div className="container-todo">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Customer</span>
                        {customers.map((value, i) => (
                            <Draggable draggableId={value.id.toString()} index={i} key={value.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                                    >
                                        <span className="todos__single--text">{value.customerCode}</span>
                                        <span className="todos__single--text">{value.customerName}</span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${snapshot.isDraggingOver ? "dragcomplete" : "remove"
                            }`}
                    >
                        <span className="todos__heading">Resell</span>
                        {CompletedCustomers.map((value, i) => (
                            <Draggable draggableId={value.id.toString()} index={i} key={value.id}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        ref={provided.innerRef}
                                        className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                                    >
                                        <span className="todos__single--text">{value.customerCode}</span>
                                        <span className="todos__single--text">{value.customerName}</span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default CustomerList