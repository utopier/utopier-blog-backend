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
var User_1 = __importDefault(require("./User"));
var Tag_1 = __importDefault(require("./Tag"));
var Comment_1 = __importDefault(require("./Comment"));
var Image_1 = __importDefault(require("./Image"));
var Post = /** @class */ (function (_super) {
    __extends(Post, _super);
    function Post() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", String)
    ], Post.prototype, "id", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Post.prototype, "createdDate", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Post.prototype, "updatedDate", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Post.prototype, "title", void 0);
    __decorate([
        typeorm_1.Column({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Post.prototype, "content", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return User_1.default; }, function (user) { return user.posts; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", User_1.default)
    ], Post.prototype, "author", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Comment_1.default; }, function (comment) { return comment.post; }, { cascade: true }),
        __metadata("design:type", Array)
    ], Post.prototype, "comments", void 0);
    __decorate([
        typeorm_1.OneToOne(function (type) { return Image_1.default; }, function (image) { return image.postMainImg; }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Image_1.default)
    ], Post.prototype, "mainImgUrl", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return Tag_1.default; }, function (tag) { return tag.posts; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Post.prototype, "tags", void 0);
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.default; }, function (user) { return user.likeposts; }),
        typeorm_1.JoinTable(),
        __metadata("design:type", Array)
    ], Post.prototype, "likers", void 0);
    Post = __decorate([
        typeorm_1.Entity()
    ], Post);
    return Post;
}(typeorm_1.BaseEntity));
exports.default = Post;
//# sourceMappingURL=Post.js.map