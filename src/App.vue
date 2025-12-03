<script setup lang="ts">
import { ref } from 'vue'

const input1 = ref('')

const status = ref('')

const info = ref<any>('')

const startFind = async (name: string) => {
  try {
    const newName = ref('')
    console.log('finding')
    console.log(name)
  if (name.startsWith('npm:')) {
    status.value = 'npm'
    newName.value = name.replace('npm:', '').trim()
    const result = await window.ipcRenderer.invoke('get-package-intel', newName.value)
    info.value = result
    console.log(info.value, status.value)
    
  }

  if (name.startsWith('dnpm:')) {
    status.value = 'dnpm'
    newName.value = name.replace('dnpm:', '').trim()
    const result = await window.ipcRenderer.invoke('get-package-intel-deep', newName.value)
    console.log(result)
    info.value = result

  }

  if (name.startsWith('py:')) {
    status.value = 'py'
    newName.value = name.replace('py:', '').trim()
    const result = await window.ipcRenderer.invoke('get-pypi-intel', newName.value)
    console.log(result)
    info.value = result

  }

  if (name.startsWith('dpy:')) {
    status.value = 'dpy'
    newName.value = name.replace('dpy:', '').trim()
    const result = await window.ipcRenderer.invoke('get-pypi-intel-deep', newName.value)
    console.log(result)
    info.value = result
    
  }
  
  if (name.startsWith('cpp:')) {
    status.value = 'cpp'
    newName.value = name.replace('cpp:', '').trim()
    const result = await window.ipcRenderer.invoke('get-cpp-intel', newName.value)
    console.log(result)
    info.value = result

    
  }
} catch (error) {
  errorMsg.value = error
  return console.error(error)
}
}

const errorMsg = ref()
</script>

<template>
  <div id="consoleBox" v-show="info.error">
    {{ info.error }}
  </div>
  <div id="main">
    <div id="logo" class="">
    </div>
    <div id="content-space">
      <div id="normal" class="block1" v-if="status !== 'cpp' && info !== '' && !info.error">
        <div class="infomation">
          <div id="name">
            {{ info ? info.name : 'Unknown' }}
          </div>
          <div id="version">
            version: {{ info ? info.version : 'Unknown' }}
          </div>
          <div id="release">
            latest: {{ info ? info.released : 'Unknown' }}
          </div>
          <div id="author">
            author: {{ info ? info.author : 'Unknown' }}
          </div>
          <div id="desc">
            description: <br />{{ info ? info.desc : 'No descriptions here' }}
          </div>
          <div id="license">
            License: {{ info ? info.license : 'Not MIT, Apache, and BSD' }}
          </div>
          <div id="homepage">
            homepage: {{ info ? info.homepage : 'Not Found' }}
          </div>
        </div>
        <div id="specific" class="block1" v-if="status === 'dpy' || status === 'dnpm'">
          <div class="infomation">
            <div id="updated">
              updated at: {{ info ? info.updated : 'Unknown' }}
            </div>
            <div id="email">
              email: {{ info ? info.email : 'Unknown' }}
            </div>
            <div id="py" v-if="status === 'dpy'">
              <div id="pypi">
                Pypi: {{ info ? info.links.pypi : 'Unknown' }}
              </div>
              <div id="repo">
                Repository: {{ info ? info.links.repo : 'Unknown' }}
              </div>
              <div id="docs">
                Docs: {{ info ? info.links.docs : 'Unknown' }}
              </div>
            </div>
            <div id="npm" v-if="status === 'dnpm'">
              <div id="npm">
                Npm: {{ info ? info.links.npm : 'Unknown' }}
              </div>
              <div id="repo">
                Repository: {{ info ? info.links.repo : 'Unknown' }}
              </div>
              <div id="bugs">
                Bugs Report: {{ info ? info.links.bugs : 'Unknown' }}
              </div>
              <div id="maintainers">
                Maintainers: {{ info ? info.people.maintainers : 'Unknown' }}
              </div>
              <div id="contributors">
                Contributors: {{ info ? info.people.contributors : 'Unknown' }}
              </div>
            </div>
          </div>
        </div>
        <div class="security" v-if="status !== 'cpp'">
          <div id="score">
            Score: {{ info ? info.security.score : 'Unknown' }}
          </div>
          <div id="issue">
            Detected Issues: {{ info ? info.security.issues.length || 0 : 'Unknown' }}
          </div>
        </div>
      </div>
      <div id="cpp" v-if="status === 'cpp' && info !== '' && !info.error">
        <div id="name">
          {{ info ? info.name : 'Unknown' }}
        </div>
        <div id="stars">
          Stars: {{ info ? info.stars : 'Unknown' }}
        </div>
        <div id="forks">
          Forks: {{ info ? info.forks : 'Unknown' }}
        </div>
        <div id="license">
          License: {{ info ? info.license : 'Unknown' }}
        </div>
        <div id="desc">
          Description: <br />{{ info ? info.desc : 'No descriptions here' }}
        </div>
        <div id="updated">
          Updated: {{ info ? info.updated : 'Unknown' }}
        </div>
        <div id="url">
          URL: <br />{{ info ? info.url : 'Unknown' }}
        </div>
        <div id="html-url">
          HTML-URL: <br />{{ info ? info.htmlUrl : 'Unknown' }}
        </div>
        <div id="forks-url">
          Forks-URL: <br />{{ info ? info.forksUrl : 'Unknown' }}
        </div>
        <div id="vis">
          Visibiity: {{ info ? info.vis : 'Unknown' }}
        </div>
        <div id="issues">
          Issues: {{ info ? info.issues : 'Unknown' }}
        </div>
        <div id="security">
          Note: {{ info ? info.security.note : 'Unknown' }}
        </div>
      </div>
    </div>
    <div id="command-area">
      <input type="text" placeholder="Try: 'npm find: gsap', 'py find: pandas', or 'cpp find: opencv/opencv'"
        spellcheck="false" v-model="input1" @keydown.enter="startFind(input1)" />
    </div>
  </div>
</template>

<style scoped>
#main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 1vh;
  gap: 1vh;
  position: relative;
}

#consoleBox {
  width: 70%;
  height: 5.5vh;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: inset 0 0 0 2px red;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.7vh;
  bottom: 8vh;
  left: 1.3vh;
}

#console.active {
  scale: 1;
}

#normal,
#cpp {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  gap: 3vh;
}

#name {
  font-size: 5vh;
  font-weight: 800;
  margin: 4vh 0 2.5vh;
}

#cpp>div {
  overflow-wrap: break-word;
  display: flex;
  box-sizing: border-box;
  width: 100%;
  /* background-color: blue; */
}

#content-space {
  display: flex;
  /* background-color: blue; */
  width: 100%;
  height: 92%;
  box-sizing: border-box;
  overflow: hidden scroll;
}

#console {
  scale: 1;
  height: 6vh;
  position: absolute;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0 1.5vh;
  bottom: 8vh;
  left: 1.3vh;
  border-radius: 1vh;
  box-shadow: 0 0 0 2px red;
}

.border {
  width: 100%;
  height: 1px;
  background-color: #00000090;
  display: flex;
}

#content-space::-webkit-scrollbar {
  display: none;
}

.contentBlock {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  gap: 1vh;
}

#command-area {
  box-sizing: border-box;
  overflow: hidden;
  height: 7%;
  width: 100%;
  display: flex;
  background-color: #1a1a1c;
  padding: 1vh;
  border-radius: 1vh;
}

#command-area>input {
  background-color: #ffffff15;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  border-radius: 0.5vh;
  color: white;
  padding: 0 1.5vh;
  font-size: 2.2vh;
  font-weight: 500;
}

#logo {
  display: flex;
  background-image: url('../logo.png');
  width: 100%;
  height: 5vh;
  box-sizing: border-box;
  background-repeat: no-repeat;
  overflow: hidden;
}
</style>