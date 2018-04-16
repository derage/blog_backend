'use strict';

// tests for posts
// Generated by serverless-mocha-plugin

const mod = require('../app');
const mochaPlugin = require('serverless-mocha-plugin');

const wrapper = mochaPlugin.lambdaWrapper;
const expect = mochaPlugin.chai.expect;

const wrapped = wrapper.wrap(mod, { handler: 'handler' });

describe('posts', () => {
    let post;

    it('creates a post', () =>
        wrapped.run({
            method: 'POST',
            body: {
                title: 'Test post',
                content: 'Test content',
            },
        }).then((response) => {
            console.log("gelllkloawdwdahWJ'IDA;WDNA;UWDAW" +
                "DAWDAWDAWDAW")
            post = response.post;
            expect(post.id).not.to.be.equal(null);
        }));

    it('updates the post', () =>
        wrapped.run({
            method: 'PUT',
            path: {
                id: post.id,
            },
            body: {
                title: 'Test post edited',
                content: 'Test content edited',
                date: post.date,
            },
        }).then((response) => {
            post = response.post;
            expect(post.id).not.to.be.equal(null);
        }));

    it('gets the post', () =>
        wrapped.run({
            method: 'GET',
        }).then((response) => {
            const createdPost = response.Items.filter(item => item.id === post.id)[0];
            expect(createdPost.id).to.be.equal(post.id);
            expect(createdPost.title).to.be.equal('Test post edited');
            expect(createdPost.content).to.be.equal('Test content edited');
            expect(createdPost.date).to.be.equal(post.date);
        }));

    it('deletes a post', () =>
        wrapped.run({
            method: 'DELETE',
            path: {
                id: post.id,
            },
        }));

    it('checks that the post is deleted', () =>
        wrapped.run({
            method: 'GET',
        }).then((response) => {
            const createdPost = response.Items.filter(item => item.id === post.id);
            expect(createdPost).to.be.eql([]);
        }));
});