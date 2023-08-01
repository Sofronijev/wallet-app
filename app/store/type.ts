import { PayloadAction } from "@reduxjs/toolkit";

export type SliceAction<Response, Request = never, Type extends string = string> = PayloadAction<
  Response,
  Type,
  Request extends never ? never : { arg: { originalArgs: Request } }
>;
