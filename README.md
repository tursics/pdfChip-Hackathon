pdfChip Hackathon
=================

This is a project of the 2nd pdfChip Hackathon on 2015-11-23 to 2015-11-24 in Leuven (Belgium).

How to start
============

Call on mac terminal
/Term/pdfChip/callas\ pdfChip/pdfChip ./toc.html ./index.html ./result.pdf --listcollector=./data/collector.json

Or call on windows command line
pdfChip.cmd toc.html index.html result.pdf --listcollector=data/collector.json

The goals
=========

The goal is to create a PDF file from a database. To make it a real life issue: Create a PDF book of a wikipedia chapter.

Working with a database requires event driven (asynchroniously) javascript. So you must use the pdfChip printing loop and the 'begin printing' and 'end printing' calls:

	function cchipPrintLoop()
	{
		cchip.beginPrinting();
		insertContent( baseLink, function() {
			cchip.endPrinting();
		});
	}

... I continue this document later time ...

TOC
3 phase

wait for image preloading

'for loops' for multi-page generation must change to event base recursive calls

exception -> endPrinting -> PDF generate

To do
=====

http cache
