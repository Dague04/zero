"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllStudents = exports.deleteStudent = exports.updateStudent = exports.getStudent = exports.addStudent = void 0;
const uuidv4_1 = require("uuidv4");
const StudentDao_1 = require("../daos/StudentDao");
// import {
//   DynamoDBClient,
//   GetItemCommand,
//   PutItemCommand,
//   ScanCommand
// } from '@aws-sdk/client-dynamodb';
// const REGION = 'us-east-2';
// const ddbClient = new DynamoDBClient({
//   region: REGION
// });
const studentDao = new StudentDao_1.StudentDao();
const studentId = uuidv4_1.uuid();
const TABLE_NAME = 'school-district';
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bodyJson = req.body;
        let firstName = bodyJson.firstName;
        let lastName = bodyJson.lastName;
        let phone = bodyJson.phone;
        let grade_year = bodyJson.grade_year;
        let gender = bodyJson.gender;
        // console.log('BODYJSON:', bodyJson);
        yield studentDao.add({
            TableName: TABLE_NAME,
            Item: {
                PK: { S: `STU#${studentId}` },
                SK: { S: `#METADATA#${studentId}` },
                firstName: { S: firstName },
                lastName: { S: lastName },
                phone: { S: phone },
                grade_year: { S: grade_year },
                gender: { S: gender }
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                student: 'Student added'
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addStudent = addStudent;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.params.id;
        const data = yield studentDao.getOne({
            TableName: TABLE_NAME,
            Key: {
                PK: {
                    S: `STU#${studentId}`
                },
                SK: {
                    S: `STU#${studentId}`.replace('STU', '#METADATA')
                }
            }
        });
        res.status(200).json({
            status: 'success',
            data: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getStudent = getStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.params.id;
        let bodyJson = req.body;
        let firstName = bodyJson.firstName;
        let lastName = bodyJson.lastName;
        let phone = bodyJson.phone;
        let grade_year = bodyJson.grade_year;
        let gender = bodyJson.gender;
        const data = yield studentDao.update({
            TableName: TABLE_NAME,
            Item: {
                PK: { S: `STU#${studentId}` },
                SK: { S: `#METADATA#${studentId}` },
                firstName: { S: firstName },
                lastName: { S: lastName },
                phone: { S: phone },
                grade_year: { S: grade_year },
                gender: { S: gender }
            }
        });
        console.log(data);
        res.status(200).json({
            status: 'success',
            data: 'Student Profile Updated'
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let studentId = req.params.id;
        yield studentDao.delete({
            TableName: TABLE_NAME,
            Key: {
                PK: {
                    S: `STU#${studentId}`
                },
                SK: {
                    S: `STU#${studentId}`.replace('STU', '#METADATA')
                }
            }
        });
        res.status(200).json({
            status: 'Success',
            data: `School with id of SCH${studentId} deleted`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteStudent = deleteStudent;
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield studentDao.getAll({
            TableName: TABLE_NAME,
            FilterExpression: 'begins_with(PK, :PK)',
            ExpressionAttributeValues: {
                ':PK': {
                    S: `STU#`
                }
            },
            ProjectionExpression: 'firstName, lastName, phone, grade_year, age'
        });
        res.status(200).json({
            status: 'Success',
            data: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAllStudents = getAllStudents;
