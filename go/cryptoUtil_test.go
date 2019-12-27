package main

import (
	"testing"
)

var str = "jiapan"

func TestDesEcbEncrypt(t *testing.T) {
	if DesEcbEncrypt(str, "01234567") != "09a89287a8dc1b52" {
		t.Fatal(nil, "TestDesEcbEncrypt fail")
	}
}

func TestDesCbcEncrypt(t *testing.T) {
	if DesCbcEncrypt(str, "01234567", "12345678") != "bcbeaf968bc9a44e" {
		t.Fatal(nil, "TestDesCbcEncrypt fail")
	}
}

func Test3DesEcbEncrypt(t *testing.T) {
	if TripleDesEcbEncrypt(str, "0123456789abcd0123456789") != "491bc5877a7aa428" {
		t.Fatal(nil, "Test3DesEcbEncrypt fail")
	}
}

func Test3DesCbcEncrypt(t *testing.T) {
	if TripleDesCbcEncrypt(str, "0123456789abcd0123456789", "12345678") != "0b6afce98a2be6de" {
		t.Fatal(nil, "Test3DesCbcEncrypt fail")
	}
}
