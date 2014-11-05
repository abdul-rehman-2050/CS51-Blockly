/**
 * @fileoverview output blocks for Blockly.
 * @author supermind2002@gmail.com (Abdul Rehman)
 */
'use strict';

goog.provide('Blockly.Blocks.output');

goog.require('Blockly.Blocks');



Blockly.Blocks.labelCount=0;

Blockly.Blocks['text_length'] = {
  init: function() {
    this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
    this.setColour(260);
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField('length');
    this.setOutput(true, 'Number');
    this.setTooltip('Returns number of letters in the provided text.');
  }
};
//---------------------------------------------------------------
Blockly.Blocks['Define_var'] = {
  
  init: function()
  {
	this.setColour(50);
	var textInput = new Blockly.FieldTextInput('var1');
    this.appendDummyInput()  
        .appendField('Define')	
        .appendField(textInput, 'var_name')
		.appendField('AT')
		.appendField(new Blockly.FieldTextInput('30H'),'Address');
		
        
    this.setPreviousStatement(true);
	this.setNextStatement(true);
//this.setOutput(true, 'String');	
  }	
};
Blockly.Blocks['Define_BIT'] = {
  
  init: function()
  {
	this.setColour(70);
	var textInput = new Blockly.FieldTextInput('BIT_NAME');
    this.appendDummyInput()  
        .appendField('Define BIT')	
        .appendField(textInput, 'bit_name')
		.appendField('AT')
		.appendField(new Blockly.FieldTextInput('00H'),'Address');
		
    this.setPreviousStatement(true);
	this.setNextStatement(true);    
    //this.setOutput(true, 'String');
  }	
};



//---------------------------------------------------------------

Blockly.Blocks['label_text'] = {
  
  init: function()
  {
	this.setColour(150);
	var textInput = new Blockly.FieldTextInput('P0.0');
    this.appendDummyInput()       
        .appendField(textInput, 'TEXT');
        
    this.setOutput(true, 'String');
	
	this.setOutput(true);	      
  }	
};





//--------------------------------------------------------------
Blockly.Blocks['Bit_Output'] = {

init: function() {
	var dropdown = new Blockly.FieldDropdown([ ['TOGGLE','CPL'],['HIGH', 'SETB'],['LOW', 'CLR']]);

	
	this.appendDummyInput()
        .appendField('Bit Address');
	this.appendValueInput('A');	
	this.appendDummyInput()
        .appendField('Bit Operation')
	    .appendField(dropdown, 'MODE');		
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(200);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('change bit status of any bit, Use text input to add address or name of the bit');

	 
   }

};
//--------------------------------------------------------------
Blockly.Blocks['MOV_BLOCK'] = {

init: function() {
	
	
	this.appendDummyInput()
        .appendField('MOV ');
	this.appendValueInput('A');	
	this.appendValueInput('B')
	     .setCheck('String')
         .appendField(',');	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(200);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('change bit status of any bit, Use text input to add address or name of the bit');

	 
   }

};
//-------------------------------------------------------------
Blockly.Blocks['short_Assembly'] = {
	
init: function() {
	  
	   
     
	var textInput = new Blockly.FieldTextInput('label'+Blockly.Blocks.labelCount+':');
    this.appendDummyInput()    
		.appendField(new Blockly.FieldAngle('300', this.validator), 'HUE')	
        .appendField(textInput, 'TEXT');
        
    this.setColour(300);
    this.setPreviousStatement(true);
	this.setNextStatement(true);	
	Blockly.Blocks.labelCount++; 
	
 },
 validator: function(text) {
    // Update the current block's colour to match.
    this.sourceBlock_.setColour(text);
  }



};


Blockly.Blocks['ACALL'] = {
  init: function() {
  var dropdown = new Blockly.FieldDropdown([ ['ACALL','ACALL'],['CALL', 'CALL'],['LCALL', 'LCALL']]);

	this.appendDummyInput()
	    .appendField(dropdown, 'MODE');		
	this.appendDummyInput()
	this.appendValueInput('A');	
	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(100);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('change bit status of any bit, Use text input to add address or name of the bit');
  }
};


Blockly.Blocks['JUMP'] = {
  init: function() {
  var dropdown = new Blockly.FieldDropdown([ ['Short Jump','SJMP'],['Normal Jump', 'AJMP'],['Long Jump', 'LJMP']]);

	this.appendDummyInput()
	    .appendField(dropdown, 'MODE');		
	this.appendDummyInput()
	this.appendValueInput('A');	
	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	this.setColour(100);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('jump to a scpecific Address');
  }
};


Blockly.Blocks['BJUMP'] = {
  init: function() {
  var dropdown = new Blockly.FieldDropdown([['BIT_IS_HIGH', 'JB'],['BIT_IS_LOW','JNB']]);
  var textInput = new Blockly.FieldTextInput('P0.0');
	this.appendDummyInput()
	    .appendField('IF ')
		
	.appendField(textInput,'bitAddress')
	.appendField('?');
     	
	this.appendDummyInput()
        .appendField(dropdown, 'MODE')
		.appendField('GOTO:')
		;		
	
	this.appendValueInput('A');	
	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	this.setColour(250);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('jump to a scpecific Address');
  }
};


Blockly.Blocks['CJUMP'] = {
  init: function() {
  var dropdown = new Blockly.FieldDropdown([ ['Carry_IS_HIGH','JC'],['CARRY_IS_LOW', 'JNC']]);

	this.appendDummyInput()
	    .appendField('IF ')
	    .appendField(dropdown, 'MODE')
		.appendField('GOTO:')
		;		
	this.appendDummyInput()
	this.appendValueInput('A');	
	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	this.setColour(330);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('jump to a scpecific Address');
  }
};
Blockly.Blocks['DJNZ'] = {
  
  init: function() {
  var textInput_ADD = new Blockly.FieldTextInput('00H');
  var textInput_VAR = new Blockly.FieldTextInput('R0');
    this.appendDummyInput()
	    .appendField('DJNZ')
		.appendField(textInput_VAR,'V')
		.appendField(textInput_ADD,'A');
   this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	this.setColour(65);
  }
};

Blockly.Blocks['JZ'] = {
  init: function() {
  var dropdown = new Blockly.FieldDropdown([ ['==','JZ'],['!=', 'JNZ']]);

	this.appendDummyInput()
	    .appendField('IF (A')
	    .appendField(dropdown, 'MODE')
		.appendField('0) GOTO:')
		;		
	this.appendDummyInput()
	this.appendValueInput('A');	
	
	this.setInputsInline(true);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	this.setColour(65);
	this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
	this.setTooltip('jump to a scpecific Address');
  }
};
//-------------------------------------------------------------


Blockly.Blocks['ORG'] = {
	
init: function() {
	  
	
    this.appendDummyInput()       
        .appendField('ORG')
		.appendField(new Blockly.FieldAngle('290', this.validator), 'HUE');
	this.appendValueInput('A');	
        
    this.setColour(290);
    this.setNextStatement(true);
	
	
 },
validator: function(text) {
    // Update the current block's colour to match.
    this.sourceBlock_.setColour(text);
  }
};


Blockly.Blocks['RET'] = {
	
init: function() {
	  
	
    this.appendDummyInput()       
        
		.appendField(new Blockly.FieldAngle('290', this.validator), 'HUE').appendField('RET');
	
        
    this.setColour(290);
    this.setPreviousStatement(true);
	
	
 },
validator: function(text) {
    // Update the current block's colour to match.
    this.sourceBlock_.setColour(text);
  }
};


Blockly.Blocks['RETI'] = {
	
init: function() {
	  
	
    this.appendDummyInput()       
        
		.appendField(new Blockly.FieldAngle('190', this.validator), 'HUE').appendField('RETI');
	
        
    this.setColour(190);
    this.setPreviousStatement(true);
	
	
 },
validator: function(text) {
    // Update the current block's colour to match.
    this.sourceBlock_.setColour(text);
  }
};

Blockly.Blocks['lookup'] = {
	
init: function() {
	  
	var textInput = new Blockly.FieldTextInput('0');
    this.appendDummyInput()       
        .appendField('LOOK UP TABLE')
		.appendField(textInput,'A');
      
    this.setColour(120);
    this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	
 }

};

Blockly.Blocks['read_lookup'] = {
	
init: function() {
	  
	var textInput = new Blockly.FieldTextInput('0');
    this.appendDummyInput()       
        .appendField('Read Table# ')
		.appendField(textInput,'A')
		.appendField('Index')
		//.appendField(textInput,'i');
		
		
		;
    this.appendValueInput('i');  
    this.setColour(20);
    this.setPreviousStatement(true);
	this.setNextStatement(true);
	
	
 }

};
//======


Blockly.Blocks['END'] = {
	
init: function() {
	  
	
    this.appendDummyInput()       
        .appendField('END');
        
    this.setColour(300);
    this.setPreviousStatement(true);
	
	
 }

};



//========================================================================
