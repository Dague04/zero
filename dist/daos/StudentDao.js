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
exports.StudentDao = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const REGION = 'us-east-2';
const ddbClient = new client_dynamodb_1.DynamoDBClient({
    region: REGION
});
class StudentDao {
    add(aStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ddbClient.send(new client_dynamodb_1.PutItemCommand(aStudent));
        });
    }
    getOne(aStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ddbClient.send(new client_dynamodb_1.GetItemCommand(aStudent));
            return data.Item;
        });
    }
    update(aStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ddbClient.send(new client_dynamodb_1.PutItemCommand(aStudent));
        });
    }
    delete(aStudent) {
        return __awaiter(this, void 0, void 0, function* () {
            yield ddbClient.send(new client_dynamodb_1.DeleteItemCommand(aStudent));
        });
    }
    getAll(array) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield ddbClient.send(new client_dynamodb_1.ScanCommand(array));
            return data.Items;
        });
    }
}
exports.StudentDao = StudentDao;
