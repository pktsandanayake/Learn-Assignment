const styles = {
  container: {
    display: "flex" as const,
    flex: 1,
    justifyContent: "left" as const,
    alignItems: "left" as const,
  },
  heading: {
    color: "green" as const,
    textAlign: "center" as const,
  },
  radioGroup: {
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "space-around" as const,
    marginTop: "20px" as const,
    borderRadius: "8px" as const,
    backgroundColor: "white" as const,
    padding: "30px" as const,
  },
  radioButton: {
    display: "flex" as const,
    flexDirection: "row" as const,
    alignItems: "center" as const,
  },
  radioLabel: {
    marginLeft: "8px" as const,
    fontSize: "17px" as const,
    color: "#333" as const,
  },
};

export default styles;
