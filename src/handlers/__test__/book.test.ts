import prisma from "../../db";
import { createBook } from "../book";
import { PrismaClient } from "@prisma/client";
    
jest.mock("@prisma/client");

describe("createBook function", () => {
    test("should create a book", async() => {
        const testBook = {
            id: "someid",
            name: "test title",
            link: 'test link',
            inStock: true,
            isbn: "someisbn",
        }
        const res = {
            json: jest.fn(),
        }
        const next = jest.fn();
        const book = await createBook(testBook,res, next);
        expect(res.json).toHaveBeenCalledWith({ book });
        expect(next).not.toHaveBeenCalled();
    })
}
)
