import { Component, Output, EventEmitter } from '@angular/core';
import Keyboard from "simple-keyboard"

@Component({
  selector: 'app-teclado-virtual',
  standalone: true,
  imports: [],
  templateUrl: './teclado-virtual.component.html',
  styleUrl: './teclado-virtual.component.css'
})
export class TecladoVirtualComponent {
  value = "";
  keyboard: Keyboard | undefined;
  @Output() keyPress = new EventEmitter<string>();

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        'default': [
          'q w e r t y u i o p',
          'a s d f g h j k l ñ',
          'z x c v b n m',
        ]
      }
    });
  }

  onChange = (input: string) => {
    this.value = input;
    //console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Tecla presionada: ", button);
    this.keyPress.emit(button);
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard?.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard?.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard?.setOptions({
      layoutName: shiftToggle
    });
  };
}
