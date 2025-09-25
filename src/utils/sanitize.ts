function sanitize(data: any) {
  if (data) {
    if (Array.isArray(data)) {
      return data.map((el) => {
        let attributes = el.attributes;
        if (!attributes) attributes = {};

        attributes.id = parseInt(el.id);
        if (attributes) {
          const keys = Object.keys(attributes);
          for (var a = 0; a < keys.length; a++) {
            if (attributes[keys[a]] && attributes[keys[a]].data) {
              attributes[keys[a]] = sanitize(attributes[keys[a]].data);
            }
            if (attributes[keys[a]] && attributes[keys[a]].data === null) {
              attributes[keys[a]] = null;
            }
          }
          return attributes;
        } else {
          return null;
        }
      });
    } else {
      let attributes = data.attributes;
      if (!attributes) attributes = {};
      if (attributes) {
        const keys = Object.keys(attributes);
        for (var a = 0; a < keys.length; a++) {
          if (attributes[keys[a]] && attributes[keys[a]].data) {
            attributes[keys[a]] = sanitize(attributes[keys[a]].data);
          }

          if (attributes[keys[a]] && attributes[keys[a]].data === null) {
            attributes[keys[a]] = null;
          }
        }
        return { id: parseInt(data.id), ...data.attributes };
      } else {
        if (data?.id) return { id: parseInt(data.id) };
        else return null;
      }
    }
  }
}

export default sanitize;
