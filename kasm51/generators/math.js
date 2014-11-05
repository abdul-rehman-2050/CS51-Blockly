
/**
 * @fileoverview Generating Assembly for math blocks.
 * @author supermind2002@gmail.com [Abdul Rehman -- Lahore,Pakistan]
 */



'use strict';
goog.provide('Blockly.Kasm51.math');
goog.require('Blockly.Kasm51');



Blockly.Kasm51['math_number'] = function(block) {
  // Numeric value.
  var code = parseInt(block.getFieldValue('NUM'));
  if(code<256 && code >-129)
  return [code, Blockly.Kasm51.ORDER_ATOMIC];
  else
  return '[Error] value is greater then 255 || less then -128';
};


Blockly.Kasm51['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  var OPERATORS = 
  {
    'ADD': [' + ', Blockly.Kasm51.ORDER_ADDITION],
    'MINUS': [' - ', Blockly.Kasm51.ORDER_SUBTRACTION],
    'MULTIPLY': [' * ', Blockly.Kasm51.ORDER_MULTIPLICATION],
    'DIVIDE': [' / ', Blockly.Kasm51.ORDER_DIVISION],
  };
  
  var tuple = OPERATORS[block.getFieldValue('OP')];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Kasm51.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Kasm51.valueToCode(block, 'B', order) || '0';
  var code;
 
  //code = argument0 + operator + argument1;
  code = '     MOV     A,#'+argument0+'\n     ADD     A,#'+argument1;

  return [code, order];

  
  
};

Blockly.Kasm51['ALU_INS'] = function(block) {


 var bit_mode = block.getFieldValue('MODE');
   var bb = block.getFieldValue('B');
   if(bit_mode=='MUL') return 'MUL       AB\n';
   else if(bit_mode=='INC') return 'INC       '+bb+'\n';
  else if(bit_mode=='DEC') return 'DEC       '+bb+'\n';   
   return bit_mode+'            A,'+bb+'\n';

}