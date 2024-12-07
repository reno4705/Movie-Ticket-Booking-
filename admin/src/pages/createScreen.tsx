/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface Seat {
    seat_id: string;
}

interface Row {
    rowname: string;
    cols: { seats: Seat[] }[];
}

interface SeatLayout {
    type: string;
    rows: Row[];
    price: number;
}

interface Screen {
    name: string;
    location: string;
    seats: SeatLayout[];
    city: string;
    screenType: string;
}

const CreateScreenPage: React.FC = () => {
    const tempseatlayout: SeatLayout[] = [
        {
            // platinum
            type: "DIAMOND",
            rows: [
                {
                    // row 2
                    rowname: "A",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    rowname: "B",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "C",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "D",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    rowname: "E",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "F",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "G",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "H",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "I",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "J",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "K",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "L",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "M",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "N",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "O",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "P",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "Q",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "R",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "S",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "T",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
            ],
            price: 200,
        },
        {
            // silver - 20 objects
            type: "PEARL",
            rows: [
                {
                    // row 2
                    rowname: "U",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
                {
                    // row 2
                    rowname: "V",
                    cols: [
                        // col 1
                        {
                            seats: [
                                {
                                    seat_id: "1",
                                },
                                {
                                    seat_id: "2",
                                },
                                {
                                    seat_id: "3",
                                },
                                {
                                    seat_id: "4",
                                },
                                {
                                    seat_id: "5",
                                },
                            ],
                        },
                        // col 2
                        {
                            seats: [
                                {
                                    seat_id: "6",
                                },
                                {
                                    seat_id: "7",
                                },
                                {
                                    seat_id: "8",
                                },
                                {
                                    seat_id: "9",
                                },
                                {
                                    seat_id: "11",
                                },
                                {
                                    seat_id: "12",
                                },
                                {
                                    seat_id: "13",
                                },
                                {
                                    seat_id: "14",
                                },
                                {
                                    seat_id: "15",
                                },
                                {
                                    seat_id: "16",
                                },
                                {
                                    seat_id: "17",
                                },
                                {
                                    seat_id: "18",
                                },
                                {
                                    seat_id: "19",
                                },
                                {
                                    seat_id: "20",
                                },
                            ],
                        },
                        // col 3
                        {
                            seats: [
                                {
                                    seat_id: "21",
                                },
                                {
                                    seat_id: "22",
                                },
                                {
                                    seat_id: "23",
                                },
                                {
                                    seat_id: "24",
                                },
                                {
                                    seat_id: "25",
                                },
                            ],
                        },
                    ],
                },
            ],
            price: 60,
        },
    ];

    const [screen, setScreen] = useState<Screen>({
        name: "",
        location: "",
        seats: tempseatlayout,
        city: "",
        screenType: "",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setScreen({ ...screen, [name]: value });
    };

    const handleScreenTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { value } = event.target;
        setScreen({ ...screen, screenType: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (
                screen.name === "" ||
                screen.location === "" ||
                screen.seats.length == 0 ||
                screen.city === "" ||
                screen.screenType === ""
            ) {
                toast.error("Please fill all the fields", {
                    position: "top-right",
                });
                return;
            }

            const response = await fetch(
                `http://localhost:5000/movie/createscreen`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(screen),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Screen creation successful", data);

                toast.success("Screen Created Successfully", {
                    position: "top-right",
                });
            } else {
                console.error("Screen creation failed", response.statusText);
                toast.error("Screen Creation Failed", {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="px-[600px] pt-[100px] font-poppins">
                <div className="w-[550px] h-[650px] bg-[#ffffff] px-[100px] py-[80px]  [box-shadow:rgba(0,_0,_0,_0.3)_0px_19px_38px,_rgba(0,_0,_0,_0.22)_0px_15px_12px] rounded-xl mb-[100px]">
                    <h2 className="text-[2.2rem] text-[#444] mb-[30px] text-center font-semibold">
                        Add Screen
                    </h2>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={screen.name}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>
                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            name="location"
                            placeholder="Location"
                            value={screen.location}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <div className="mb-[30px] text-[18px] font-normal">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={screen.city}
                            onChange={handleInputChange}
                            className=" w-[350px] p-[10px] text-[18px] border-[1px] border-[solid] border-[#cccccc]"
                        />
                    </div>

                    <div className="mb-[30px] text-[18px] font-normal">
                        <p className="text-[18px]">Screen Type:</p>
                        <label>
                            <input
                                type="radio"
                                name="screenType"
                                value="3D"
                                checked={screen.screenType === "3D"}
                                onChange={handleScreenTypeChange}
                                className="mr-2 w-4 h-4 mt-1"
                            />
                            <span className="text-[18px]">3D</span>
                        </label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                name="screenType"
                                value="2D"
                                checked={screen.screenType === "2D"}
                                onChange={handleScreenTypeChange}
                                className="mr-2 w-4 h-4 mt-1"
                            />
                            <span className="text-[18px]">2D</span>
                        </label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                name="screenType"
                                value="4D"
                                checked={screen.screenType === "4D"}
                                onChange={handleScreenTypeChange}
                                className="mr-2 w-4 h-4 mt-1"
                            />
                            <span className="text-[18px]">4D</span>
                        </label>
                        <br/>
                        <label>
                            <input
                                type="radio"
                                name="screenType"
                                value="IMAX"
                                checked={screen.screenType === "IMAX"}
                                onChange={handleScreenTypeChange}
                                className="mr-2 w-4 h-4 mt-1"
                            />
                            IMAX
                        </label>
                        <br/>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-[190px] bg-[rgb(248,68,100)] border-[none] outline-[none] h-[49px] rounded-[49px] text-[#fff] uppercase font-semibold mx-[0] my-[10px] cursor-pointer [transition:0.5s] ml-[25%] hover:bg-[#007bff]"
                    >
                        Create Screen
                    </button>
                </div>
            </div>
        </>
    );
};

export default CreateScreenPage;
