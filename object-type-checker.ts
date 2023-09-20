class ObjectTypeChecker {
    private data: [string,unknown][];

    constructor(data: Record<string, unknown>){
      if (Array.isArray(data)){
        throw new Error('ObjectTypeChecker Does Not Support Array!!!');
      }
      this.data = [...Object.entries(data)];
      }

    private typeCheck(value: unknown) {
        if(Array.isArray(value)){
          return '[]'
        } else if (!Number.isNaN(Number(value))){
          return 'number'
        } else if (value === null){
          return 'null'
        } else {
          return typeof value;
        }
    }

    private makeFirstAsCapital(str: string): string{
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private getNames(data: [string, unknown][]): string[]{
      return data.map(pair => pair[0]);
    }

    private makeString(arr: string[], child = false){
      if(!child ){
        arr[0] = '\n  ' + `${arr[0]}`
      }
      return arr.map(
        item => child? `interface ${item}`
        : `  ${item}`).join('\n');
    }

    private printTypes(typeArrangemert: string, child = false): void{
      if(child){
        console.log(typeArrangemert);
      } else{
        console.log('interface GiveName {'+ typeArrangemert + '\n}');
      }
    }

    public getTypeAsArray(){
        return this.data.map<string>(([typeName, value]) => `${typeName}: ${this.typeCheck(value)};`);
    }

    public getTypeAsString() {
      
      const typeArrangemert = this.makeString(this.getTypeAsArray());
      this.printTypes(typeArrangemert)
      return typeArrangemert;
    }

    public getArrayProperties(): string[] {
      const arrays = this.data.filter(pair => this.typeCheck(pair[1]) === '[]')
      return this.getNames(arrays);
    }

    public getObjectProperties(): string[] {
      const objects = this.data.filter(pair => this.typeCheck(pair[1]) ==='object');
      return this.getNames(objects);
    }

    public getArrayPropertiesAsString(): string {
      const typeArrangemert = this.makeString(this.getArrayProperties().map(item => `${this.makeFirstAsCapital(item)}:[];`));
      this.printTypes(typeArrangemert, true);
      return typeArrangemert
    }
    public getObjectPropertiesAsString(): string {
      const typeArrangemert = this.makeString(this.getObjectProperties().map(item => `${this.makeFirstAsCapital(item)} {}`),
      true);
      this.printTypes(typeArrangemert, true);
      return typeArrangemert
    }
  }