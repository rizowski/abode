import { expect } from 'chai';
import abode from '../src';

describe('abode', () =>{

  describe('get', () =>{
    it('can camelcase env variables', () =>{
      process.env.HA_HA = 'worked';
      expect(abode.get('haHa')).to.equal('worked');
    });

    it('returns undefined for unfound variable', ()=>{
      expect(abode.get('SHOULD_NOT_EXIST')).to.equal(undefined);
    });
  });

  describe('set', () =>{
    it('can set the environment variable', () =>{
      abode.set('haHa', '12345');
      expect(process.env).to.have.property('HA_HA').and.to.equal('12345');
    });

    it('replaces an already defined environment variable', () =>{
      process.env.HA_HA = 'yeah ok';
      abode.set('haHa', 'ok yeah');
      expect(process.env).to.have.property('HA_HA').and.to.equal('ok yeah');
    })
  });

  describe('default', () =>{
    it('does not replace the env variable if it exists', () =>{
      process.env.HA_HA = 'not funny';
      abode.default('haHa', 'very funny');
      expect(process.env).to.have.property('HA_HA').and.to.equal('not funny');
    });

    it('sets the env variable if it does not exist', () =>{
      abode.default('notHa', 'not funny');
      expect(process.env).to.have.property('NOT_HA').and.to.equal('not funny');
    });
  });

  describe('exists', () =>{
    it('returns true if the variable exists', () =>{
      process.env.TEST_VAR = 'yay';
      expect(abode.exists('TEST_VAR')).to.be.true;
    });

    it('returns false if the variable does not exist', () =>{
      expect(abode.exists('nope')).to.be.false;
    });
  });

  describe('isEnv', () =>{
    it('returns true if NODE_ENV equals test', () =>{
      expect(abode.isEnv('test')).to.be.true;
    });

    it('returns false if NODE_ENV equals local', () =>{
      expect(abode.isEnv('local')).to.be.false;
    });
  });
});
