package main

import (
	"os"
	"text/template"

	"github.com/Masterminds/sprig/v3"
)

const indexJS = `const varsity = {
  {{- range $key, $value := . }}
  {{ $key }}: "{{ $value }}",
  {{- end }}
};

console.log('Varsity Variables:', varsity);

function main() {
  // Your main code here
  console.log('Welcome to {{ .ProjectName }} by {{ .Author }}!');
}

main();
`

func main() {
	// Example variables - these would normally be provided by the user
	vars := map[string]string{
		"ProjectName": "ExampleProject",
		"Author":      "John Doe",
		"Version":     "1.0.0",
		"License":     "MIT",
	}

	tmpl, err := template.New("index.js").Funcs(sprig.TxtFuncMap()).Parse(indexJS)
	if err != nil {
		panic(err)
	}

	file, err := os.Create("index.js")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = tmpl.Execute(file, vars)
	if err != nil {
		panic(err)
	}
}
