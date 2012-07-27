
/** 
 * Brandon Thomas <echelon@gmail.com> 2008
 * Revision: $Id: script.js 6 2008-02-20 05:01:57Z echelon $
 */

/**
 * DynNode encapsulates the DOM node of the dynamic paragraph.
 */
function DynNode()
{
	/**
	 * Partial map of the ASCII table.
	 * Everything is offset by 65.
	 */
	this.charMap = new Array(
		'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
		'[', '\\', ']', '^', '_', '`', 
		'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
		'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
	)

	/**
	 * Holds the binary representation of the string.
	 * Each index holds one char's binary equivalent. 
	 */
	this.binString = new Array()

	/**
	 * The paragraph node where all the action occurs.
	 */
	this.pNode = null

	/**
	 * The text we assign to the paragraph.
	 */
	this.text = null

	/**
	 * Pointer to the interval timer.
	 */
	this.interval = null

	/**
	 * Internal step/state of the interval.
	 */
	this.counter = 0


	/*********************************************
					METHODS
	*********************************************/


	/**
	 * Ensure that the paragraph node is linked.
	 */
	this.linkNode = function()
	{
		// Decide which paragraph to attach to.
		var div
		if (document.body.clientWidth >= 700)
			div = document.getElementById('dynamic1')
		else
			div = document.getElementById('dynamic2')

		this.pNode = div.getElementsByTagName('p').item(0)
	}

	/**
	 * Get the binary equivalent for the char provided.
	 * Returns as a string.
	 */
	this.charToBin = function(c)
	{
		var addr = 0

		for (var i = 0; i < this.charMap.length; i++) 
			if (c == this.charMap[i]) {
				addr = i + 65
				break
			}

		var ret= ""
		for (var i = 7; i >= 0; i--)
			ret += (addr >> i) & 1

		return ret
	}

	/**
	 * Set text of the node.
	 */
	this.setText = function(text)
	{
		if (!this.pNode)
			this.linkNode()

		this.pNode.innerHTML = text
	}

	/**
	 * Triggered for each step in the scramble process.
	 */
	this.scramble = function()
	{
		if (this.text == null) {
			return
		}
		// Are we done?
		if (this.counter >= this.text.length * 8) {
			this.counter = 0
			this.setText(this.text+"<span class='blinktext'>_</span>")
			clearInterval(this.interval)
			return
		}

		var str = ""
		var i = 0

		// Text chars
		for (; i < parseInt(this.counter/8); i++) {
			str += this.text.charAt(i)
		}

		// Binary char
		if(i < this.binString.length)
			str += this.binString[i].charAt(this.counter%8)

		this.setText(str)
		this.counter++
	}

	/**
	 * Parse the text into binary, then set the timer to 
	 * gradually parse over the ASCII.
	 */
	this.scrambler = function(text)
	{
		this.text = text
		this.binString = new Array()
		this.linkNode()

		for (var i = 0; i < this.text.length; i++)
			this.binString[i] = this.charToBin(this.text.charAt(i))

		this.interval = setInterval("scramble_text()", 5)
	}

	/**
	 * Clear the internal state of the object/paragraph.
	 */
	this.clear = function()
	{
		clearInterval(this.interval)
		this.setText('')
		this.interval  = null
		this.counter   = 0
		this.text      = null
		this.binString = new Array()
	}
}

var DNode = new DynNode()

function display_text(text) { DNode.scrambler(text) }

function scramble_text() { DNode.scramble() }

function clear_text() { DNode.clear() }

