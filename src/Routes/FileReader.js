import React from 'react';
import Component from 'react';
import text7 from "../Assets/barney_smca6_tif_07.js";
import text8 from "../Assets/barney_smca6_tif_08.js";
import text9 from "../Assets/barney_smca6_tif_09.js";
import text10 from "../Assets/barney_smca6_tif_10.js";
import text11 from "../Assets/barney_smca6_tif_11.js";
import text12 from "../Assets/barney_smca6_tif_12.js";
import correct from './PhotoRoom-20230718_041720.png';
import wrong from './PhotoRoom-20230718_040308.png';

import {useState, useEffect} from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';

const textObj = {
	7: text7,
	8: text8,
	9: text9,
	10: text10,
	11: text11,
	12: text12
};
function FileReader() {
	const [para, setPara] = useState([[0,1]]);	
	const [lists, setLists] = useState([0,1,2,3,4,5,6]);	
	const [pointer, setPointer] = useState(0);
    const [show, setShow] = useState(false);
    const [wrongshow, setWrongshow] = useState(false);
	const [answers, setAnswers] = useState("ㅋㅋ");
	
function textPreprocess(text){
	let ppedT = text.split("\n\n");
	ppedT.splice(0,1);
	let ABCDArr = [];
	let TFArr = [];
	let textArr = [];
	for (let i = 0; i<ppedT.length; i++){		
		ppedT[i] = ppedT[i].trim();
		const matchedDiff = ppedT[i].match("Diff");
		if(!matchedDiff){
			textArr.push([i, ppedT[i].trim()]);
		} else{
			let pushedText = ppedT[i].slice(0, matchedDiff.index).trim();
			const matchedTRUE = pushedText.match(/Answer:  (TRUE|FALSE)$/);
			const matchedABCD = pushedText.match(/Answer:  (A|B|C|D)$/);
			if(matchedTRUE){
				TFArr.push([0, ...pushedText.split("\n")]);
			} else if(matchedABCD){
				ABCDArr.push([0, ...pushedText.split("\n")])
			} else{
			}
		}	
	}

	for(let i = 0; i<TFArr.length; i++){
		if(TFArr[i][2] == "Answer:  TRUE"){
			TFArr[i][2] = true;
		} else{
			TFArr[i][2] = false;
		}
		TFArr[i][0] = parseInt(TFArr[i][1].match(/\d*/)[0])
	}
	for(let i = 0; i<ABCDArr.length; i++){
		switch(ABCDArr[i][6]){
			case "Answer:  A":
				ABCDArr[i][6] = "A";
				break;
			case "Answer:  B":
				ABCDArr[i][6] = "B";
				break;
			case "Answer:  C":
				ABCDArr[i][6] = "C";
				break;
			case "Answer:  D":
				ABCDArr[i][6] = "D";
				break;				
		}
		ABCDArr[i][0] = parseInt(ABCDArr[i][1].match(/\d*/)[0])
	}
	setPara(textArr)
	setLists( [...TFArr, ...ABCDArr].sort((a,b) => a[0] - b[0]) );	
}
	useEffect(()=>{
		textPreprocess(textObj[7])
	},[])
	
	function printABCD(){
		return(
			<>
				<Row><Button variant = "dark" style = {{background: "#d18063"}} onClick = {()=>{
						checkAnswer("A")
					}}>{lists[pointer][2]}</Button></Row>
				<Row><Button variant = "dark" style = {{background: "#e2d2d2"}} onClick = {()=>{
						checkAnswer("B")
					}}>{lists[pointer][3]}</Button></Row>
				<Row><Button variant = "dark" style = {{background: "#bfc8d7"}} onClick = {()=>{
						checkAnswer("C")
					}}>{lists[pointer][4]}</Button></Row>
				<Row><Button variant = "dark" style = {{background: "#FF6A89"}} onClick = {()=>{
						checkAnswer("D")
					}}>{lists[pointer][5]}</Button></Row>
			
			</>
		)
	}
	function printTF(){
		return(
			<>
				<Row><Button variant = "dark" style = {{background: "#d18063"}} onClick = {()=>{
						checkAnswerTF("true")
					}}>오랑맞당</Button></Row>
				<Row><Button variant = "dark" style = {{background: "#e2d2d2"}} onClick = {()=>{
						checkAnswerTF("false")
					}}>육랑틀렸당</Button></Row>				
			</>
		)
	}
	function checkAnswer(a){
		if(pointer == lists.length -1){
			console.log("끝이당")
			if(lists[pointer][6] == a){
				console.log("끝인데 맞았당");				
			} else{
				setAnswers(lists[pointer][6])
				setWrongshow(true);
				setTimeout(() => {
				  setWrongshow(false);
				}, 1000);					
			}
		} else if(lists[pointer][6] == a){
			setShow(true);
			setTimeout(() => {
			  setShow(false);
			  setPointer(pointer+1);								
			}, 350);			
		} else{
			setAnswers(lists[pointer][6])
			setWrongshow(true);
			setTimeout(() => {
			  setWrongshow(false);
			}, 1000);				
		}
	}
	function checkAnswerTF(tr){
		if(pointer == lists.length -1){
			console.log("끝이당")
			if(lists[pointer][2] == JSON.parse(tr)){
				console.log("끝인데 맞았당");
			} else{
				console.log("끝인데 틀렸당");
				console.log(lists[pointer][2]);
			}
		} else if(lists[pointer][2] == JSON.parse(tr)){
			setShow(true);
			setTimeout(() => {
			  setShow(false);
			  setPointer(pointer+1);								
			}, 350);							
		} else{
			setAnswers(lists[pointer][2].toString())
			setWrongshow(true);
			setTimeout(() => {
			  setWrongshow(false);
			}, 1000);			}
	}
  return (
    <>
		<Container>
			<div className = "selectFile">
				<Row>
					<Form.Select aria-label="Default select example"
						onChange = {(e)=>{							
							console.log(e.target.value);
							setPointer(0);
							textPreprocess(textObj[e.target.value]);
						}}>
						  <option value="7">7과</option>
						  <option value="8">8과</option>
						  <option value="9">9과</option>
						  <option value="10">10과</option>
						  <option value="11">11과</option>
						  <option value="12">12과</option>						
					</Form.Select>						
				</Row>
				
				<Row>
					<Button variant="primary" onClick = {()=>{
							setLists( [...lists].sort(() => Math.random() - 0.5) );	
							setPointer(70);
						}}>섞기</Button>						
				</Row>				
		    </div>
		   <Container className = "problems">
			   <Row className = "prText"><Col style = {{background: "#e9ecef", borderRadius: "6px", padding: "6px"}}>{lists[pointer][1]}</Col></Row>
			   <Container className = "prAnswer">		
			  {
				  (lists[pointer].length == 3)
				  ?printTF()
				  :printABCD()
			  }				   
			   </Container>
		   </Container>
	  
	  	</Container>
	  
      <Modal show={show}>
        <Modal.Body>
			<Container>
				<Row>
					<Col>
						<Image src = {correct} style = {{width: "100%"}}/>						
					</Col>
				</Row>				
			</Container>
		</Modal.Body>
      </Modal>	  
      <Modal show={wrongshow}>
        <Modal.Body>
			<Container>
				<Row>
					<Col>
						<Image src = {wrong} style = {{width: "100%"}}/>						
					</Col>					
				</Row>		
				<Row><Col>정답은 {answers}</Col></Row>
			</Container>
		</Modal.Body>
      </Modal>	  	  
	  
    </>
  );
}

export default FileReader;
