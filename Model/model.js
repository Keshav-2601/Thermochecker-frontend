import express from 'express'

export default class UserModel{
    constructor(email,password){
        this.email=email;
        this.password=password;
    }
}