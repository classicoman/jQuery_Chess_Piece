//CONSTANTS
const WIDTH = 60;
const HEIGHT = 60;

  /**** GLOBALS ****/
    
//	var timeout;
	//Is there a piece moving?
	var pieceIsMoving= false;
	//Piece that is moving
	var pieceMoving;
	var count=0;
	//Initialize Position
	var iposX, iposY = -1;
	var posX, posY = -1;
	//posicio inicial de la peça
	var left1, top1;

/**
 * For every piece, it calculates if the move is correct.
 * 25122028  -  Only implemented for the White Rook. It doesn't take into account if there's a friend piece in the way or an enemy piece or if the destination is same as original or out of the limits of the board. For any other piece, all moves are allowed so far.
 * 
 * @param {[[type]]} piece [[Description]]
 * @param {[[type]]} origin [Origin Square]
 * @param {[[type]]} destination [Destination Square]
 */
function calculateValidityOfMove(piece, origin, dest) {
	var validMove = false;
	//Get the Id of the piece
	var id = piece.attr('id');

	//xtoni  Pdt calcular que la posicio origen i destinacio no siguin la mateixa
	
	//xtoni   Pdt calcular que la posició destinació no estigui fora dels límits
	
	switch(id) {
			//Rook
		case 'wR':
			if ( (origin['x']==dest['x']) || (origin['y']==dest['y']) )
				validMove = true;
			break;
			
			//Bishop
		case 'wB':
			//Generates an array of valid positions for a bishop to move
			
			//xtoni   pending
			//generateValidPositionsBishop(origin);
	
			validMove = true;
			break;
		default:
			//xtoni  Temporal
			validMove = true;
			break;
	}
															
	return validMove;
}


/**
 * Calculates if a Move by a Piece is correct or not.
 * 25122018
 xtoni
 * 
 * @param {	[DOM Element]} piece [The piece we're moving]
 * @return {[[Boolean]]} [[It's a correct move or not]]
 */

function isAValidMove(piece) {

	//Origin Square
	var origSquare = [];
	origSquare['x'] = Math.trunc(left1/60)+1;
	origSquare['y'] = 8-Math.trunc(top1/60);
	
	//1er calcular la posició sobre la qual estic sostenint la peça 
	var left = Number(piece.css("left").slice(0,-2));
	var top =  Number(piece.css("top").slice(0,-2));
		
	//Center of the square of the moving piece
	var center = [left + WIDTH/2, top + HEIGHT/2];

	//Destination Square
	var destSquare = [];
	destSquare['x'] = Math.trunc(center[0]/60)+1;
	destSquare['y'] = 8-Math.trunc(center[1]/60);

//alert("From "+origSquare['x']+","+origSquare['y']+" to "+destSquare['x']+","+destSquare['y']);
	
	//Calculate if it's a valid move.
	return calculateValidityOfMove(piece, origSquare, destSquare);
}

/**
 * Sets the pieces on start position
 * 25122018 - Only the white pieces
 * @return no
 */
function setPiecesOnStart() {
  
    $("#board").empty();
    
    var pieces = ["wP","wP","wP","wP","wP","wP","wP","wP","wR","wN","wB","wQ","wK","wB","wN","wR"];

    //Draw White Pieces
    for(i=0;i<16;i++) {
        row = Math.trunc(i/8);
        col = i%8;
                
        var el = "<div id='"+pieces[i]+"' class='piece' style='left:"+col*HEIGHT+"px; top:"+(row+6)*WIDTH+"px'></div>";
     
        $("#board").append(el);
    }
    
    
    $(".piece").mousedown( function(event) {
    //Original idea: using a timer to control every x ms where the mouse is. Better solution: use on mousemove
    /*  	   timeout = setInterval(function(){
                $("#piece").text(" - "count++);   
            }, 500);*/

        if( $(this).hasClass('piece'))   {

            //Create a clon in the original position
            //https://stackoverflow.com/questions/10126395/how-to-jquery-clone-and-change-id/10127093
/*
            var $klon = $(this).clone().prop('id', 'clon' );
            $(this).after($klon);
*/

            //Captures initial position of the element
            position = $(this).position();
            left1 = position.left;
            top1 = position.top; 

            //Captures initial position of the mouse
            iposX = event.pageX;
            iposY = event.pageY;

            pieceIsMoving = true;
            pieceMoving = $(this);
        }
      return false;	
      });
}



$(document).ready(function() {
				
/*
$("#piece").click(function(){
	alert("has clicat");	
});*/
				
    
  //Dibuixa les peces.
  setPiecesOnStart();
    

	/** USING SMART JSDOC COMMENT BRACKETS EXTENSION **/
	/**
	* Sets the position of the moving piece
	* @param {[[DOM element]]} piece [[The piece to move]]
	* @param {[[int]]} posX [[Current X position of the Cursor]]
	* @param {[[int]]} posY [[Current Y position of the Cursor]]
	* @param {[[type]]} final [[true if it's the piece final position]]
	*/
	
	function setPiecePosition (piece, posX, posY, final) {
		//Calcular desplaçament produit
		dX = (posX - iposX);
		dY = (posY - iposY);

		//Calcular Nova posició final de la peça
		//xtoni  Eliminar variables globals left1  i top 1  !!!!
		nX = left1 + dX;
		nY = top1 + dY;			
					
		//If its the final position after mouseup event
		if (final) {
			//Quotient
			//https://stackoverflow.com/questions/4228356/integer-division-with-remainder-in-javascript
						
			var x = Math.floor( (nX+WIDTH/2)/WIDTH);
			var y = Math.floor( (nY+HEIGHT/2)/HEIGHT);
				
			$(piece).css("left", x*WIDTH+"px" );
			$(piece).css("top",  y*HEIGHT+"px" );	
		} else {
			//Not the final position
			$(piece).css("left", nX+"px" );
			$(piece).css("top", nY+"px" );
		}	
	}

					
				
		$(document).on("mousemove", function(event) {
					
			if (pieceIsMoving) {	
				if ( (iposX < 0) && (iposY < 0) ) {		
					//Get Initial Position
/*						iposX = event.pageX;
							iposY = event.pageY;   */		
				}
				else {						
//				position = $("#piece").position();

					//Set the new position of the piece
					//using event.pageX pageY that
					//establish the current position of the cursor
							
					setPiecePosition(pieceMoving, event.pageX, event.pageY, false);

/*					$("#piece").animate({
								left: (posX - iposX)
							});*/		
				}
						
				$("#log").text("X: " + (posX-iposX) + "  Y: " + (posY-iposY));	
			}
		});
				
				
			
	$(document).mouseup(function(event){
/*  			clearInterval(timeout); */

    if (pieceIsMoving) {
        pieceIsMoving = false;

        //delete clon
/*
        $("#clon").remove();
*/
				//Mira si la posició destí és bona per aquesta peça, si el moviment és correcte.
        if (isAValidMove(pieceMoving))
            //Set the Final position of the piece
            setPiecePosition(pieceMoving, event.pageX, event.pageY,  true);
        else
            //Back to the initial position
            setPiecePosition(pieceMoving, iposX, iposY,  true);
            
    }
      
		return false;	
	});					
});
			