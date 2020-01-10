import { APIGatewayProxyEvent } from "aws-lambda";
import {Request} from 'express';
import { parseUserId } from "../auth/utils";

/**
 * Get a user id from an API Gateway event
 * @param event an event from API Gateway
 *
 * @returns a user id from a JWT token
 */
export function getUserIdExpress(event: Request): string {
  const authorization = event.headers.authorization as string;
  console.log('authorization log ',authorization)
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}

export function getUserId(event: APIGatewayProxyEvent): string {
  const authorization = event.headers.Authorization;
  const split = authorization.split(' ')
  const jwtToken = split[1]

  return parseUserId(jwtToken)
}