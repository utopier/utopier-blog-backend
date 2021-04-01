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
var typeorm_1 = require("typeorm");
var Post_1 = __importDefault(require("./Post"));
var Comment_1 = __importDefault(require("./Comment"));
var Image_1 = __importDefault(require("./Image"));
var Subscription_1 = __importDefault(require("./Subscription"));
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User_1 = User;
    var User_1;
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", String)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "createdDate", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "updatedDate", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "nickname", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "bio", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Subscription_1.default; }, function (subscription) { return subscription.user; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Subscription_1.default)
    ], User.prototype, "subscription", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Image_1.default; }, function (image) { return image.avatarUser; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Image_1.default)
    ], User.prototype, "avatar", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Post_1.default; }, function (post) { return post.author; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "posts", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1.default; }, function (comment) { return comment.user; }, { cascade: true }),
        __metadata("design:type", Array)
    ], User.prototype, "comments", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Post_1.default; }, function (post) { return post.likers; }),
        __metadata("design:type", Array)
    ], User.prototype, "likeposts", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1; }, function (user) { return user.followings; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], User.prototype, "followers", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1; }, function (user) { return user.followers; }),
        __metadata("design:type", Array)
    ], User.prototype, "followings", void 0);
    User = User_1 = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}(typeorm_1.BaseEntity));
exports.default = User;
//# sourceMappingURL=User.js.map