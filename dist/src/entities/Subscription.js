"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Json } from 'aws-sdk/clients/robomaker';
var typeorm_1 = require("typeorm");
var User_1 = __importDefault(require("./User"));
var Subscription = /** @class */ (function (_super) {
    __extends(Subscription, _super);
    function Subscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Subscription.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Subscription.prototype, "createdDate", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Subscription.prototype, "updatedDate", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Subscription.prototype, "endpoint", void 0);
    __decorate([
        typeorm_1.Column({ type: 'boolean', nullable: true }),
        __metadata("design:type", Boolean)
    ], Subscription.prototype, "expirationTime", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return User_1.default; }, function (user) { return user.subscription; }),
        __metadata("design:type", User_1.default)
    ], Subscription.prototype, "user", void 0);
    Subscription = __decorate([
        typeorm_1.Entity()
    ], Subscription);
    return Subscription;
}(typeorm_1.BaseEntity));
exports.default = Subscription;
//# sourceMappingURL=Subscription.js.map