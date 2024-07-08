"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentInput = exports.createCommentInput = exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    firstName: zod_1.default.string().nonempty({ message: "First Name is required" }),
    lastName: zod_1.default.string().optional(),
    email: zod_1.default.string().email({ message: "Provide a valid email" }).nonempty({ message: "Email is required" }),
    password: zod_1.default.string({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters long" })
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string({ message: "Email is required" }).email({ message: "Provide a valid email address" }),
    password: zod_1.default.string({ message: "Password is requires" }).min(6)
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().nonempty({ message: 'Title is required' }),
    content: zod_1.default.string().nonempty({ message: "Content is required" })
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string().optional().refine(val => val !== "", {
        message: "Title can't be  empty"
    }),
    content: zod_1.default.string().optional().refine(val => val !== "", {
        message: "Content can't be empty"
    }),
    id: zod_1.default.string().min(1, { message: "Id cannot be empty" })
});
exports.createCommentInput = zod_1.default.object({
    content: zod_1.default.string().nonempty({ message: "Comment is required" })
});
exports.updateCommentInput = zod_1.default.object({
    content: zod_1.default.string().refine(val => val !== "", {
        message: "Comment can't be empty"
    }),
    id: zod_1.default.string().min(1, { message: "Id cannot be empty" })
});
