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
exports.getAllSchools = exports.deleteSchool = exports.updateSchool = exports.getSchool = exports.addSchool = void 0;
const uuidv4_1 = require("uuidv4");
const SchoolDao_1 = require("../daos/SchoolDao");
const schoolDao = new SchoolDao_1.SchoolDao();
const schoolId = uuidv4_1.uuid();
// const school = new School();
const TABLE_NAME = 'school-district';
const addSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let bodyJson = req.body;
        let schoolName = bodyJson.schoolName;
        let district = bodyJson.district;
        let mascot = bodyJson.mascot;
        // console.log('BODYJSON:', bodyJson);
        yield schoolDao.add({
            TableName: TABLE_NAME,
            Item: {
                PK: {
                    S: `SCH#${schoolId}`
                },
                SK: {
                    S: `#METADATA#${schoolId}`
                },
                name: {
                    S: schoolName
                },
                mascot: {
                    S: mascot
                },
                district: {
                    S: district
                }
            }
        });
        // console.log('My data: ', data);
        res.status(200).json({
            status: 'success',
            data: {
                school: 'School added'
            }
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.addSchool = addSchool;
const getSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schoolId = req.params.id;
        const data = yield schoolDao.getOne({
            TableName: TABLE_NAME,
            Key: {
                PK: {
                    S: `SCH#${schoolId}`
                },
                SK: {
                    S: `SCH#${schoolId}`.replace('SCH', '#METADATA')
                }
            }
        });
        console.log('jfjffj: ', data);
        res.status(200).json({
            status: 'success',
            data: data
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.getSchool = getSchool;
const updateSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schoolId = req.params.id;
        console.log(schoolId);
        let bodyJson = req.body;
        let schoolName = bodyJson.schoolName;
        let district = bodyJson.district;
        let mascot = bodyJson.mascot;
        const data = yield schoolDao.update({
            TableName: TABLE_NAME,
            Item: {
                PK: {
                    S: `SCH#${schoolId}`
                },
                SK: {
                    S: `#METADATA#${schoolId}`
                },
                name: {
                    S: schoolName
                },
                mascot: {
                    S: mascot
                },
                district: {
                    S: district
                }
            }
        });
        console.log('jfjffj: ', data);
        res.status(200).json({
            status: 'success',
            data: 'School updated'
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateSchool = updateSchool;
const deleteSchool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let schoolId = req.params.id;
        console.log(schoolId);
        yield schoolDao.delete({
            TableName: TABLE_NAME,
            Key: {
                PK: {
                    S: `SCH#${schoolId}`
                },
                SK: {
                    S: `SCH#${schoolId}`.replace('SCH', '#METADATA')
                }
            }
        });
        res.status(200).json({
            status: 'Success',
            data: `School with id of SCH${schoolId} deleted`
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteSchool = deleteSchool;
const getAllSchools = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield schoolDao.getAll({
            TableName: TABLE_NAME,
            FilterExpression: 'begins_with(PK, :PK)',
            ExpressionAttributeValues: {
                ':PK': {
                    S: `SCH#`
                }
            },
            ProjectionExpression: 'schoolName, district, mascot'
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
exports.getAllSchools = getAllSchools;
